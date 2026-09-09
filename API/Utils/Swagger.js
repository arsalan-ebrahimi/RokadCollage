import swaggerJSDoc from "swagger-jsdoc";

const descriptionMd = `
# مستندات وب‌سرویس کالج رکاد (Rokad Collage API Documentation)

### 📚 راهنمای پارامترهای سراسری در متدهای دریافت لیست (GET All):
- **جستجوی متنی (\`q\`):** جستجوی واژه در فیلدهای متنی مانند \`?q=برنامه‌نویسی\`
- **صفحه‌بندی (\`page\` و \`limit\`):** مانند \`?page=1&limit=10\`
- **مرتب‌سازی (\`sort\`):** مرتب‌سازی نزولی یا صعودی فیلدها مانند \`?sort=-createdAt\`
- **انتخاب فیلدها (\`fields\`):** دریافت فیلدهای دلخواه مانند \`?fields=title,category,icon\`
- **پیوند مراجع (\`populate\`):** پر کردن فیلدهای ارتباطی مانند \`?populate=course\`
- **فیلترهای پیشرفته (\`gte\`, \`lte\`, \`in\`, \`regex\`):** فیلتر روی خصوصیات مانند \`?category=گرافیک\`
`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rokad Collage API",
      version: "1.0.0",
      description: descriptionMd,
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Modules/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
