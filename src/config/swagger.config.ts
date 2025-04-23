import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { Application } from "express";

const setUpSwagger = (app: Application) => {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "ZAP Blog Server Api Documentation",
          version: "1.0.0",
          description: "API documentation",
        },
        servers: [
          { url: "http://localhost:3009/" },
       
        ],
        // components: {
        //   securitySchemes: {
        //     BearerAuth: {
        //       type: "http",
        //       scheme: "bearer",
        //       bearerFormat: "JWT",
        //     },
        //   },
        // },
      },
      apis: [
        path.join(__dirname, "../**/*.js"), // For compiled JS files
        path.join(__dirname, "../**/*.ts"), // For TS files in development
        path.join(__dirname, "../routes/**/*.js"), // Common route locations
        path.join(__dirname, "../routes/**/*.ts"),
        path.join(__dirname, "../controllers/**/*.js"), // Controller files may have route definitions
        path.join(__dirname, "../controllers/**/*.ts"),
        path.join(__dirname, "../deliverymen/**/*.js"), // Your specific directory
        path.join(__dirname, "../deliverymen/**/*.ts"),
       
      ],
    };
  
    const specs: swaggerJSDoc.Options = swaggerJSDoc(options);
    if (!specs) {
      console.error("Failed to generate Swagger specs");
      return;
    }
  
    console.log(
      "Generated Swagger paths:",
      Object.keys((specs as any).paths || {}).length
    );
    console.log(
      "API paths found:",
      specs.paths ? Object.keys(specs.paths) : "None"
    );
  
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    console.log("Swagger UI set up at /api-docs");
  };
  
  export default setUpSwagger;
  
