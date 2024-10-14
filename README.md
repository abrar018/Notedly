# Notedly

Overview

Notedly is a full-stack project that demonstrates my proficiency in building both the frontend and backend of a Notion-like note-taking application. The frontend is built using React, styled with CSS, and features React Router for navigation. The backend is serverless, leveraging AWS Lambda for business logic, DynamoDB for storage, and Google OAuth for secure user authentication, all orchestrated through Terraform for Infrastructure as Code (IaC).

This project is a showcase of my ability to create a scalable, cloud-native backend alongside a polished, responsive frontend application.
Frontend (React) - Notedly
Key Features:
  
    Local Storage: Notes persist across sessions using the browser's localStorage API.
    Note Editor: A rich text editor built using the react-quill library.
    Routing: Implemented with React Router to enable multi-page navigation.
    Note Management: Create, edit, delete, and organize notes.
    Responsive Design: Built with Flexbox (or a CSS framework of your choice).
    Deployable: Hosted on Netlify for easy access and continuous deployment.


External Libraries Used:

    react-router-dom: Front-end routing for page navigation.
    react-quill: Rich text editor for note creation and editing.
    uuid: For generating unique identifiers for each note.

Additional Features:

    Tag Management: Tags can be added to notes and searched to filter through them.
    Search & Sort: Notes can be searched or sorted based on date or title.

Backend (AWS) - Notedly
Key Features:
    
    Serverless: Backend infrastructure built using AWS Lambda.
    DynamoDB Integration: Stores and retrieves user notes in a scalable NoSQL database.
    Google OAuth Authentication: Secure login via Google authentication.
    Infrastructure as Code (IaC): Managed using Terraform for easy deployment and scaling.

