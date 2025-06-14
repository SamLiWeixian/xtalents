import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
// DOCX library for document generation
import { Document, Packer, Paragraph, TextRun } from 'docx';
// Word document support
import mammoth from 'mammoth';

// API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; // API key from environment variables
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";

const CVTailorPage: React.FC = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual');
  
  // Form fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileProcessing, setFileProcessing] = useState(false);
  
  // Output state
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  // File processing function
  const processFile = async (file: File) => {
    try {
      setLoading(true);
      setError("");
      setCvText("");
      let extractedText = '';
      
      console.log(`Processing ${file.name} (${file.type}), size: ${(file.size / 1024).toFixed(2)} KB`);
      
      // For Word documents
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
          file.type === 'application/msword') {
        try {
          console.log("Extracting text from Word document...");
          const arrayBuffer = await file.arrayBuffer();
          const options = {
            arrayBuffer,
            includeDefaultStyleMap: true,
            preserveEmptyParagraphs: true
          };
          const result = await mammoth.extractRawText(options);
          let processedText = result.value;
          processedText = processedText
            .replace(/\t/g, ' ')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/\s{2,}/g, ' ')
            .trim();
          processedText = processedText
            .replace(/(?:^|\n)[-–•*]\s+/g, '\n• ');
          const possibleSections = ['EXPERIENCE', 'EDUCATION', 'SKILLS', 'SUMMARY', 'PROFILE', 'OBJECTIVE',
             'CERTIFICATIONS', 'PROJECTS', 'ACHIEVEMENTS', 'REFERENCES'];
          possibleSections.forEach(section => {
            const sectionRegex = new RegExp(`(?:^|\\n)(${section}s?|${section.toLowerCase()}s?):?\\s*(?:\\n|$)`, 'g');
            processedText = processedText.replace(sectionRegex, `\n\n${section.toUpperCase()}\n\n`);
          });
          extractedText = processedText;
          if (extractedText.length < 100 && file.size > 10000) {
            console.warn("Word document extraction may be incomplete - small text from large file");
          }
          console.log(`Successfully extracted ${extractedText.length} characters from Word document`);
        } catch (err) {
          console.error("Word document extraction failed:", err);
          throw new Error("Failed to extract text from Word document. Please try manual entry.");
        }
      }
      // For text files
      else if (file.type === 'text/plain' || file.type === 'text/rtf') {
        extractedText = await file.text();
        console.log(`Successfully read ${extractedText.length} characters from text file`);
      } 
      else {
        throw new Error(`Unsupported file format: ${file.type}`);
      }
      
      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error("No text could be extracted from the file");
      }
      
      // Clean the extracted text
      console.log("Cleaning extracted text...");
      extractedText = cleanMarkdownFormatting(extractedText);
      
      // Now send the extracted text to the Gemini API to enhance it
      console.log("Sending to Gemini API for enhancement...");
      await enhanceResumeWithGemini(extractedText);
      
    } catch (error) {
      console.error("Error processing file:", error);
      setError(`Failed to process file: ${error instanceof Error ? error.message : "Unknown error"}`);
      setLoading(false);
      setFileProcessing(false);
    }
  };

  // Dropzone setup
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setFileProcessing(true);
      processFile(file);
    }
  }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/rtf': ['.rtf']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB max size
  });
    // Clean any markdown formatting in text
  const cleanMarkdownFormatting = (text: string): string => {
    if (!text) return '';
    
    // Basic cleaning to remove markdown and normalize text
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')      // **bold** -> bold
      .replace(/\*([^*]+)\*/g, '$1')          // *italic* -> italic
      .replace(/^\s*[\-_*=]{3,}\s*$/gm, '\n') // --- or ___ or *** or === -> newline
      .replace(/^#+\s+/gm, '')                // # Heading -> Heading
      .replace(/^\s*[\-*+]\s+/gm, '• ')       // - list item -> • list item
      .replace(/\`([^\`]+)\`/g, '$1')         // `code` -> code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')// [link text](url) -> link text
      .replace(/<[^>]*>/g, '')                // Remove HTML tags
      .replace(/\n{3,}/g, '\n\n')             // Limit consecutive newlines
      .replace(/\s{2,}/g, ' ')                // Multiple spaces -> single space
      .trim();
  };
  // Enhance resume with Gemini
  const enhanceResumeWithGemini = async (resumeText: string) => {
    try {
      setLoading(true);
      setError("");

      // Check if API key is available
      if (!GEMINI_API_KEY) {
        throw new Error("API key is missing. Please check your environment variables.");
      }
      
      // Enhanced prompt for Gemini with clearer structure requirements
      const prompt = `
Generate a professional CV in clean plain text format based on the following resume text:

${resumeText}

CRITICAL FORMATTING INSTRUCTIONS - YOU MUST FOLLOW THESE EXACTLY:
- Output ONLY plain text with NO special formatting symbols whatsoever
- DO NOT use ANY markdown formatting at all in your response:
  * NO asterisks (*) for emphasis or bold
  * NO hyphens (-) or equal signs (=) for horizontal lines
  * NO hash marks (#) for headings
  * NO backticks for code
  * NO square brackets or parentheses for links
  * NO tildes (~) for strikethrough

KEY STRUCTURE REQUIREMENTS:
- Section headers must be in ALL CAPITAL LETTERS on their own line
- Add a blank line BEFORE and AFTER each section header
- Use standard bullet points (• character) for listing achievements, skills, etc.
- Each bullet point must start with the "• " character followed by an action verb
- Each bullet point must be on its own line (do not run them together)
- Use consistent formatting throughout the CV
- Organization matters - create a logical flow following standard resume conventions

FORMATTING DETAILS PER SECTION:
1. CONTACT INFORMATION (at the top):
   - First line must be the full name in ALL CAPS
   - Email, phone, LinkedIn/location each on their own line
   - DO NOT use bullet points for contact information

2. PROFESSIONAL SUMMARY:
   - Must be labeled "PROFESSIONAL SUMMARY" in all caps
   - 4-5 concise sentences highlighting key qualifications
   - Use active voice and professional language
   - Focus on years of experience and key specialties

3. WORK EXPERIENCE:
   - Must be labeled "PROFESSIONAL EXPERIENCE" in all caps
   - Each job entry must be formatted exactly as: "Job Title | Company Name | Date Range"
   - List at least 3 bullet points per job starting with "• "
   - Each bullet must begin with an ACTION VERB (e.g., "Led", "Developed")
   - Include achievements with metrics/numbers where possible

4. EDUCATION:
   - Must be labeled "EDUCATION" in all caps
   - Each degree formatted as: "Degree Name | Institution | Graduation Year"
   - List any honors, GPA (if 3.5+), or key courses as bullet points

5. SKILLS:
   - Must be labeled "SKILLS" in all caps
   - Group related skills together
   - Use bullet points for each skill category
   - Be specific about technical skills and proficiency levels

ADD THESE SECTIONS WHEN RELEVANT:
- "CERTIFICATIONS" - List each with date and issuing organization
- "PROJECTS" - List relevant projects with bullet points describing contribution
- "LANGUAGES" - List language skills with proficiency level
- "AWARDS" - List relevant professional recognitions with dates

EXAMPLE OUTPUT STRUCTURE:

JOHN DOE

email@example.com
(555) 123-4567
LinkedIn: linkedin.com/in/johndoe
San Francisco, CA


PROFESSIONAL SUMMARY

Dedicated software engineer with 8+ years of experience in full-stack development. Specialized in building scalable applications using Python, JavaScript, and cloud technologies. Strong track record of leading development teams and delivering high-impact projects that improve efficiency and user experience.


PROFESSIONAL EXPERIENCE

Senior Software Engineer | ABC Technology | 2019 - Present
• Redesigned the company's core product API, resulting in 40% faster response times
• Led a team of 5 developers in creating a new customer-facing portal using React and Node.js
• Implemented CI/CD pipeline that reduced deployment time by 65%

Software Developer | XYZ Solutions | 2016 - 2019
• Developed microservices architecture that improved system reliability by 25%
• Created automated testing suite reducing QA time by 30%
• Mentored junior developers on best coding practices


EDUCATION

Bachelor of Science in Computer Science | University of California | 2016
• Dean's List, 3.8 GPA
• Senior Project: Developed machine learning model for predictive text analysis


SKILLS

• Programming: Python, JavaScript, TypeScript, Java, SQL
• Frameworks: React, Node.js, Django, Flask, Express
• Tools: Git, Docker, AWS, Azure, Jenkins, Kubernetes

YOUR TASK: Reformat and restructure the provided resume content following these exact guidelines. Maintain the SAME CONTENT but improve the structure, wording, and format to follow this professional template.
`;
      
      // Call the Gemini API
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 4096 },
          safetySettings: []
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      if (!result) {
        throw new Error("No response content received");
      }
      
      setCvText(result);
      
    } catch (error) {
      console.error("Error enhancing resume:", error);
      setError(`API error: ${error instanceof Error ? error.message : "Unknown error"}`);
      
      // Fallback for development/testing
      setTimeout(() => {
        const fallbackText = `
JOHN DOE
Email: ${email || 'example@email.com'}
Phone: ${phone || '+65 1234 5678'}

PROFESSIONAL SUMMARY
Dedicated professional with extensive experience in project management and team leadership. Strong track record of delivering results in fast-paced environments.

WORK EXPERIENCE

Senior Project Manager | ABC Company | 2020 - Present
• Led cross-functional teams to deliver multiple projects on time and within budget
• Reduced operational costs by 20% through process optimization initiatives
• Managed client relationships resulting in high customer satisfaction rates

EDUCATION

Bachelor of Science | National University | 2016

SKILLS
• Project Management
• Team Leadership
• Stakeholder Communication
• Microsoft Office Suite
`;
        setCvText(fallbackText);
      }, 1000);
      
    } finally {
      setLoading(false);
      setFileProcessing(false);
    }
  };
  
  // Generate CV from manual input
  const handleGenerateCV = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCvText("");
    
    try {
      // Combine form inputs
      const inputContent = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Experience: ${experience}`,
        `Education: ${education}`,
        `Skills: ${skills}`
      ].join('\n\n');
      
      await enhanceResumeWithGemini(inputContent);
      
    } catch (error) {
      setError("Failed to generate CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };    // Enhanced function to extract candidate name from resume text
  const extractCandidateName = (cvText: string): string => {
    if (!cvText) return '';
    
    // Get the first line of the CV - typically this is the name in professional CVs
    const firstLine = cvText.trim().split('\n')[0];
    
    // If the first line seems like a name (not too long, no special chars)
    if (firstLine && firstLine.length < 50 && /^[A-Za-z\s\-'.]+$/.test(firstLine)) {
      return firstLine.trim();
    }
    
    // Try looking for a more explicit name pattern if first line doesn't work
    const nameMatch = cvText.match(/^[A-Z][A-Z\s]{2,}$/m);
    if (nameMatch) {
      return nameMatch[0].trim();
    }
    
    // If manual entry is used, use the name field
    if (activeTab === 'manual' && name) {
      return name;
    }
    
    return '';
  };

  // Generate a modern resume using docx (browser compatible)
  const generateModernResume = async (cvText: string, candidateName: string = ''): Promise<Blob> => {
    try {
      // Parse the CV text into structured sections
      const sections = parseResumeText(cvText);
      const doc = createProfessionalDocument(sections, candidateName);
      const buffer = await Packer.toBlob(doc);
      return buffer;
    } catch (error) {
      console.error("Error generating modern resume:", error);
      throw error;
    }
  };
  // Parse resume text into structured sections
  const parseResumeText = (text: string): { [key: string]: string[] } => {
    const lines = text.split('\n').map(line => line.trim());
    const sections: { [key: string]: string[] } = {
      'HEADER': [],
      'SUMMARY': [],
      'EXPERIENCE': [],
      'EDUCATION': [],
      'SKILLS': [],
      'OTHER': []
    };
    
    let currentSection = 'HEADER';
    let processedLines = 0;
    
    // First pass: Extract the candidate name and contact info
    if (lines.length > 0) {
      sections['HEADER'].push(lines[0]); // Assume first line is the name
      processedLines = 1;
      
      // Add next few non-empty lines to header until we hit a section title
      let i = 1;
      while (i < lines.length && i < 5) {
        const line = lines[i];
        if (line === '') {
          i++;
          continue;
        }
        if (/^[A-Z\s]{3,}$/.test(line)) { // Looks like a section header
          break;
        }
        sections['HEADER'].push(line);
        processedLines = i + 1;
        i++;
      }
    }
    
    // Second pass: Process the rest of the document by sections
    for (let i = processedLines; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines
      if (line === '') continue;
      
      // Check if this is a section header (all caps, 3+ chars)
      if (/^[A-Z][A-Z\s]{2,}$/.test(line)) {
        if (line.includes('SUMMARY') || line.includes('PROFILE')) {
          currentSection = 'SUMMARY';
          continue;
        } else if (line.includes('EXPERIENCE') || line.includes('EMPLOYMENT')) {
          currentSection = 'EXPERIENCE';
          continue;
        } else if (line.includes('EDUCATION') || line.includes('ACADEMIC')) {
          currentSection = 'EDUCATION';
          continue;
        } else if (line.includes('SKILL')) {
          currentSection = 'SKILLS';
          continue;
        } else {
          currentSection = 'OTHER';
          sections[currentSection] = sections[currentSection] || [];
          // Add the section header itself
          sections[currentSection].push(line);
          continue;
        }
      }
      
      // Add line to current section - if not already in header
      if (currentSection !== 'HEADER' || i >= processedLines) {
        sections[currentSection].push(line);
      }
    }
    
    return sections;
  };
  // Create a professionally formatted document
  const createProfessionalDocument = (sections: { [key: string]: string[] }, candidateName: string): Document => {
    // Document building will use direct styling on elements
    
    // Create document sections
    const documentChildren: Paragraph[] = [];
    
    // Add header section (name and contact info)
    if (sections['HEADER'].length > 0) {
      // Name as heading
      documentChildren.push(
        new Paragraph({
          children: [
            new TextRun({ 
              text: sections['HEADER'][0].toUpperCase(), 
              bold: true, 
              size: 36, // 18pt
              color: '2B579A' // Professional blue
            })
          ],
          spacing: { after: 240 }
        })
      );
        // Contact information
      const contactLines = sections['HEADER'].slice(1);
      if (contactLines.length > 0) {        // Create a single paragraph with all contact info separated by pipes
        const contactRunArray: TextRun[] = [];
        
        contactLines.forEach((line, index) => {
          contactRunArray.push(new TextRun({ text: line, size: 22 }));
          // Add separator between items, but not after the last one
          if (index < contactLines.length - 1) {
            contactRunArray.push(new TextRun({ text: ' | ', size: 22 }));
          }
        });
        
        documentChildren.push(
          new Paragraph({
            children: contactRunArray,
            spacing: { after: 240 }
          })
        );
      }
      
      // Add horizontal line
      documentChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "_______________________________________________________________________________",
              color: '2B579A',
              size: 20
            })
          ],
          spacing: { after: 240 }
        })
      );
    }
      // Add summary section
    if (sections['SUMMARY'].length > 0) {
      // Check if the first line is already "PROFESSIONAL SUMMARY" - avoid duplication
      const isSummaryHeader = sections['SUMMARY'][0].trim().toUpperCase() === "PROFESSIONAL SUMMARY";
      
      // Add the header only if it's not already there
      if (!isSummaryHeader) {
        documentChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "PROFESSIONAL SUMMARY", bold: true, size: 26, color: '2B579A' })
            ],
            spacing: { before: 240, after: 120 }
          })
        );
      }
        sections['SUMMARY'].forEach((line, index) => {
        // Skip the first line if it's a header (already handled)
        if (index === 0 && line.trim().toUpperCase() === "PROFESSIONAL SUMMARY") {
          return;
        }
        
        documentChildren.push(
          new Paragraph({
            children: [new TextRun({ text: line, size: 22 })],
            spacing: { after: 120 }
          })
        );
      });
      
      // Add spacing
      documentChildren.push(new Paragraph({ spacing: { after: 120 } }));
    }
      // Add experience section
    if (sections['EXPERIENCE'].length > 0) {
      // Check if the first line is already a header for experience - avoid duplication
      const isExperienceHeader = sections['EXPERIENCE'][0].trim().toUpperCase().includes("EXPERIENCE");
      
      // Add the header only if it's not already there
      if (!isExperienceHeader) {
        documentChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "PROFESSIONAL EXPERIENCE", bold: true, size: 26, color: '2B579A' })
            ],
            spacing: { before: 240, after: 120 }
          })
        );
      }      sections['EXPERIENCE'].forEach((line, index) => {
        // Skip the first line if it's a header (already handled)
        if (index === 0 && line.trim().toUpperCase().includes("EXPERIENCE")) {
          return;
        }
        
        if (line.includes('|')) {
          // This is likely a job title line: "Position | Company | Date"
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, bold: true, size: 24 })],
              spacing: { before: 160, after: 120 }
            })
          );
        } else if (line.trim().startsWith('•')) {
          // This is a bullet point
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line.trim().substring(1).trim(), size: 22 })],
              bullet: { level: 0 },
              spacing: { after: 60 }
            })
          );
        } else {
          // Regular paragraph in experience section
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { after: 60 }
            })
          );
        }
      });
      
      // Add spacing
      documentChildren.push(new Paragraph({ spacing: { after: 120 } }));
    }
      // Add education section
    if (sections['EDUCATION'].length > 0) {
      // Check if the first line is already a header for education - avoid duplication
      const isEducationHeader = sections['EDUCATION'][0].trim().toUpperCase().includes("EDUCATION");
      
      // Add the header only if it's not already there
      if (!isEducationHeader) {
        documentChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "EDUCATION", bold: true, size: 26, color: '2B579A' })
            ],
            spacing: { before: 240, after: 120 }
          })
        );
      }
        sections['EDUCATION'].forEach((line, index) => {
        // Skip the first line if it's a header (already handled)
        if (index === 0 && line.trim().toUpperCase().includes("EDUCATION")) {
          return;
        }
        
        if (line.includes('|')) {
          // This is likely a degree line: "Degree | Institution | Year"
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, bold: true, size: 24 })],
              spacing: { before: 160, after: 120 }
            })
          );
        } else if (line.trim().startsWith('•')) {
          // This is a bullet point
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line.trim().substring(1).trim(), size: 22 })],
              bullet: { level: 0 },
              spacing: { after: 60 }
            })
          );
        } else {
          // Regular paragraph in education section
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { after: 60 }
            })
          );
        }
      });
      
      // Add spacing
      documentChildren.push(new Paragraph({ spacing: { after: 120 } }));
    }
      // Add skills section
    if (sections['SKILLS'].length > 0) {
      // Check if the first line is already a header for skills - avoid duplication
      const isSkillsHeader = sections['SKILLS'][0].trim().toUpperCase().includes("SKILL");
      
      // Add the header only if it's not already there
      if (!isSkillsHeader) {
        documentChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "SKILLS", bold: true, size: 26, color: '2B579A' })
            ],
            spacing: { before: 240, after: 120 }
          })
        );
      }
        sections['SKILLS'].forEach((line, index) => {
        // Skip the first line if it's a header (already handled)
        if (index === 0 && line.trim().toUpperCase().includes("SKILL")) {
          return;
        }
        
        if (line.trim().startsWith('•')) {
          // This is a bullet point
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line.trim().substring(1).trim(), size: 22 })],
              bullet: { level: 0 },
              spacing: { after: 60 }
            })
          );
        } else {
          // Regular paragraph in skills section
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { after: 60 }
            })
          );
        }
      });
      
      // Add spacing
      documentChildren.push(new Paragraph({ spacing: { after: 120 } }));
    }
    
    // Add other sections
    if (sections['OTHER'].length > 0) {
      let currentSectionTitle = '';
      
      sections['OTHER'].forEach(line => {
        // Check if this is a section header (all caps, 3+ chars)
        if (/^[A-Z][A-Z\s]{2,}$/.test(line)) {
          currentSectionTitle = line;
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: currentSectionTitle, bold: true, size: 26, color: '2B579A' })],
              spacing: { before: 240, after: 120 }
            })
          );
        } else if (line.trim().startsWith('•')) {
          // This is a bullet point
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line.trim().substring(1).trim(), size: 22 })],
              bullet: { level: 0 },
              spacing: { after: 60 }
            })
          );
        } else {
          // Regular paragraph
          documentChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 22 })],
              spacing: { after: 60 }
            })
          );
        }
      });
    }
      // Create the document with proper styling and margins
    return new Document({
      creator: "X Talents Resume Generator",
      title: candidateName ? `${candidateName} - Professional Resume` : "Professional Resume",
      // Remove custom styles that are causing compatibility issues
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1134, // ~2cm in twip
              right: 1134,
              bottom: 1134,
              left: 1134,
            }
          }
        },
        children: documentChildren
      }]
    });
  };

  // Download as DOCX file with improved name detection
  const handleDownload = async (format: 'docx' | 'txt' = 'docx') => {
    try {
      if (!cvText) {
        setError("No content to download. Please generate a CV first.");
        return;
      }
      
      // Try to get a suitable name for the file
      let fileName = "";
      
      // If we're in manual entry mode, use the name field
      if (activeTab === 'manual' && name.trim()) {
        fileName = name;
      } 
      // If we're in upload mode, use the file name without extension
      else if (activeTab === 'upload' && uploadedFile) {
        fileName = uploadedFile.name.split('.')[0];
      }
      // Otherwise try to extract from the CV text itself
      else {
        fileName = extractCandidateName(cvText);
      }
      
      // If we still don't have a name, use a default
      if (!fileName) {
        fileName = "Professional_Resume";
      }
      
      // Format the file name
      fileName = fileName.trim().replace(/\s+/g, '_');
      
      if (format === 'docx') {
        try {
          setLoading(true);
          // Generate DOCX with formatting
          const candidateName = extractCandidateName(cvText);
          const docxBlob = await generateModernResume(cvText, candidateName);
          saveAs(docxBlob, `${fileName}.docx`);
        } catch (docxError) {
          console.error("DOCX generation error:", docxError);
          setError("Failed to generate DOCX. Falling back to text download.");
          // Fallback to text if DOCX fails
          const textBlob = new Blob([cvText], { type: "text/plain;charset=utf-8" });
          saveAs(textBlob, `${fileName}.txt`);
        } finally {
          setLoading(false);
        }
      } else {
        // Plain text download
        const blob = new Blob([cvText], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${fileName}.txt`);
      }
      
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download CV. Please try again.");
      setLoading(false);
    }
  };
  
  return (
    <main className="container" style={{
      padding: '2rem 1rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <section style={{
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto 2rem auto',
        padding: '2rem',
        background: 'var(--subtle-gradient)',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>
        <h1>CV Tailor</h1>
        <p>Create a professionally formatted CV based on your experience and education. You can input your details manually or upload a text resume for AI enhancement.</p>
      </section>
      
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Input section */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          flex: '1 1 400px',
          maxWidth: '500px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Tab navigation */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => setActiveTab('manual')}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: activeTab === 'manual' ? 'rgba(52, 152, 219, 0.1)' : 'none',
                border: 'none',
                borderBottom: activeTab === 'manual' ? '2px solid var(--primary-blue)' : 'none',
                cursor: 'pointer',
                color: '#2c3e50'
              }}
            >
              Manual Input
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: activeTab === 'upload' ? 'rgba(52, 152, 219, 0.1)' : 'none',
                border: 'none',
                borderBottom: activeTab === 'upload' ? '2px solid var(--primary-blue)' : 'none',
                cursor: 'pointer',
                color: '#2c3e50'
              }}
            >
              Upload Text File
            </button>
          </div>
          
          {/* Manual input form */}
          {activeTab === 'manual' ? (
            <form onSubmit={handleGenerateCV}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone</label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="experience" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Work Experience</label>
                <textarea
                  id="experience"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="education" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Education</label>
                <textarea
                  id="education"
                  value={education}
                  onChange={e => setEducation(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="skills" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Skills</label>
                <textarea
                  id="skills"
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
                />
              </div>
                <button 
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Generating...
                  </>
                ) : 'Generate CV'}
              </button>
            </form>
          ) : (
            // File upload section
            <div>
              <div 
                {...getRootProps()} 
                style={{ 
                  border: isDragActive ? '2px dashed var(--primary-blue)' : '2px dashed #ccc',
                  borderRadius: '5px',
                  padding: '2rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  cursor: 'pointer',
                  backgroundColor: isDragActive ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
                }}
              >
                <input {...getInputProps()} />                <div style={{fontSize: '2.5rem', color: isDragActive ? 'var(--primary-blue)' : '#ccc', marginBottom: '1rem'}}>
                  {isDragActive ? '�' : '�📄'}
                </div>
                {isDragActive ? (
                  <p>Drop the file here...</p>
                ) : (
                  <div>                    <p>Drag and drop your resume file here, or click to select</p>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.75rem' }}>
                      Supported formats: DOC, DOCX, TXT, RTF
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      justifyContent: 'center', 
                      gap: '10px',
                      marginTop: '15px',
                      fontSize: '0.8rem'
                    }}>
                      <span style={{ padding: '3px 8px', background: 'rgba(52, 152, 219, 0.1)', borderRadius: '4px' }}>DOC</span>
                      <span style={{ padding: '3px 8px', background: 'rgba(52, 152, 219, 0.1)', borderRadius: '4px' }}>DOCX</span>
                      <span style={{ padding: '3px 8px', background: 'rgba(52, 152, 219, 0.1)', borderRadius: '4px' }}>TXT</span>
                      <span style={{ padding: '3px 8px', background: 'rgba(52, 152, 219, 0.1)', borderRadius: '4px' }}>RTF</span>
                    </div>
                  </div>
                )}
              </div>
                {uploadedFile && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  borderRadius: '5px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>                    <span style={{ fontSize: '1.5rem' }}>
                      {uploadedFile.type.includes('word') ? '📝' : '📄'}
                    </span>
                    <div>
                      <p style={{ fontWeight: 'bold', margin: 0 }}>{uploadedFile.name}</p>
                      <p style={{ fontSize: '0.8rem', margin: '3px 0 0 0', color: '#666' }}>
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  {fileProcessing && (
                    <div className="spinner" style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid rgba(52, 152, 219, 0.3)',
                      borderTop: '3px solid var(--primary-blue)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {error && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(231, 76, 60, 0.1)',
              color: '#e74c3c',
              borderRadius: '5px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
        </div>
        
        {/* Output section */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          flex: '1 1 400px',
          maxWidth: '500px',
          margin: '0 auto',
          width: '100%',
        }}>
          <h2>Generated CV</h2>          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `
          }}></style>
          
          <div style={{
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'monospace',
            minHeight: '200px',
            position: 'relative'
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                height: '100%'
              }}>
                <div className="spinner" style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid rgba(52, 152, 219, 0.3)',
                  borderTop: '4px solid var(--primary-blue)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1rem'
                }}></div>
                <p style={{color: '#666'}}>Generating your professional CV...</p>
              </div>
            ) : cvText}
          </div>
            {cvText && (
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '1rem'
            }}>
              <button
                onClick={() => handleDownload('docx')}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Generating...
                  </>
                ) : 'Download as DOCX'}
              </button>
              <button
                onClick={() => handleDownload('txt')}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(52, 152, 219, 0.1)',
                  color: '#2980b9',
                  border: '1px solid var(--primary-blue)',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Download as TXT
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CVTailorPage;
