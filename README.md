# Playwright API Testing Project

## 📌 Project Description
This project contains automated API tests for [RESTful API](https://restful-api.dev/) using **Playwright**.  
It also includes **ESLint** and **Prettier** for code quality and automatic formatting.  

The project is set up with **CI/CD using GitHub Actions**, so that on every push or pull request to the `main` branch:  
- ESLint checks and auto-fixes code style,  
- Prettier checks code formatting,  
- Playwright runs all API tests automatically.  

The workflow file is located at `.github/workflows/ci.yml`.

The tests cover main CRUD operations:  
- Get all products  
- Get a product by ID  
- Add a new product  
- Update a product completely  
- Update some fields of a product  
- Delete a product  

---

## ⚙️ Project Structure
```bash
fakestore-api-tests/
├── tests/ # Playwright tests
│ └── api/
│ └── products.spec.js
├── helpers/
│ └── apiClient.js # API helper functions
├── eslint.config.js # ESLint configuration
├── .prettierrc # Prettier configuration
├── package.json
└── README.md
```

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository_url>
cd fakestore-api-tests
```

2. Install dependencies:
``` bash
npm ci
```

3.  Running Tests
``` bash
npx playwright test
```
OR
```bash
npx playwright show-report
```

4. Linting & Formatting
``` bash
Check code style:
npm run lint
```

5. Auto-fix ESLint issues:
```bash
npm run lint:fix
```

6. Format code with Prettier: 
``` bash
npm run format
```
