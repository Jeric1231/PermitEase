# PermitEase

![PermitEase Logo](https://placeholder.svg?height=100&width=300&text=PermitEase)

PermitEase is a comprehensive platform designed to streamline government permit applications in the Philippines. This student capstone project incorporates GenAI features and PayMongo payment processing to transform the traditionally frustrating permit acquisition process into a streamlined, transparent experience.

## 🌟 Features

### User Authentication Module
- User registration with role-based accounts (Individual, Business, Government)
- Secure login/logout functionality
- Profile management
- Password reset functionality
- Role-specific dashboards

### Permit Application Module
- Selection from common permit types
- Intuitive forms with validation
- Save applications as drafts
- Submit completed applications
- Application receipt generation

### Document Upload Module with GenAI
- Document upload functionality
- AI-powered document analysis for completeness
- Intelligent feedback on missing information
- Document management
- Resubmission capability for rejected documents

### Payment Module with PayMongo
- Fee calculation based on permit type
- PayMongo integration for payment processing
- Support for major payment methods (credit/debit cards, e-wallets)
- Payment verification and confirmation
- Receipt generation
- Payment history tracking
- Payment status updates

### Application Processing Module (Admin Side)
- Application review interface
- Approval/rejection process
- Request additional information
- AI-suggested routing to appropriate department
- Permit generation as PDF

### Status Tracking Module
- Real-time status updates
- Email notifications for status changes
- Application history view
- AI-estimated completion time

### Chatbot Assistant
- GenAI-powered FAQ chatbot
- Help with application process
- Guidance on document requirements
- Troubleshooting assistance

### Admin Dashboard
- View of pending applications
- Filtering and sorting options
- Statistics (applications by status, type)
- Payment tracking and reconciliation
- AI insights on processing trends

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React.js
- Internet connection for API access

## 🚀 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/permit-ease.git
cd permit-ease
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
\`\`\`
REACT_APP_API_URL=your_api_url
REACT_APP_PAYMONGO_PUBLIC_KEY=your_paymongo_public_key
REACT_APP_PAYMONGO_SECRET_KEY=your_paymongo_secret_key
\`\`\`

4. Start the development server:
\`\`\`bash
npm start
# or
yarn start
\`\`\`

5. Open your browser and navigate to `http://localhost:3000`

### User Types

1. **Individual Citizens**
   - Register for a personal account
   - Apply for personal permits (building permits, special events, etc.)
   - Track application status
   - Make payments
   - Upload required documents

2. **Business Entities**
   - Register for a business account
   - Apply for business permits and licenses
   - Manage team access
   - Track multiple applications
   - Process payments

3. **Government Employees**
   - Register with department supervisor approval
   - Process and review applications
   - Request additional documents
   - Approve or reject applications
   - Generate reports

### Application Flow

1. Register for an account based on your user type
2. Log in to access your role-specific dashboard
3. Select the permit type you need to apply for
4. Fill out the application form
5. Upload required documents
6. Submit the application
7. Pay the required fees
8. Track your application status
9. Receive notifications on status changes

## 🔧 Technologies Used

- React.js
- React Router
- Tailwind CSS
- Material UI components
- Lucide React icons
- PayMongo API
- GenAI integration

## 📞 Contact

For any inquiries, please contact:
- Email: support@permitease.gov.ph
- Phone: (02) 8XXX-XXXX

---

© 2025 PermitEase. All rights reserved. A student capstone project for Philippine government agencies.
