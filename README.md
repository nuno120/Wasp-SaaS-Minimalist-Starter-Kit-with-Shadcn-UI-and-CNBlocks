# Wasp-SaaS-Minimalist-Starter-Kit-with-Shadcn-UI-and-CNBlocks

This repository provides a streamlined starting point for building SaaS applications using the Wasp framework. It's designed to get you up and running quickly with a clean, modern UI, essential components, and a focus on core SaaS functionality.

## Key Features

*   **Simplified Structure:** Built on the Wasp framework, this template removes the complexities and examples found in default Wasp SaaS templates, such as the AI demo, file upload, and pricing pages. This allows you to focus on building *your* specific SaaS features immediately.
*   **Modern UI with Shadcn/UI:** Leverages the power and elegance of [Shadcn/UI](https://ui.shadcn.com/) for a beautiful, accessible, and customizable user interface. Enjoy pre-configured styling and a library of reusable components.
*   **Enhanced Components from CNBlocks:** Integrates select UI components from the [CNBlocks](https://github.com/Meschacirung/cnblocks) library to provide additional ready-to-use elements for your application. This further accelerates development and provides a visually appealing user experience.
*   **Streamlined Navigation:** A simplified and single-file NavBar implementation replaces the multi-section approach in the original template. This makes navigation easier to understand, customize, and maintain.
*   **Feedback Integration:** Includes a pre-built feedback button, allowing you to easily collect user feedback and iterate on your application. This is crucial for early-stage SaaS development.
*   **Clean and Minimal:** No unnecessary examples or boilerplate code. This template is designed to be a lean and mean starting point, allowing you to quickly add your own features and customizations.

## To get started:

1.  **Run the development database** (make sure to have Docker installed) (and leave it running):
    ```bash
    wasp db start
    ```

2.  **Open new terminal window (or tab)** in that same directory and continue in it.

3.  **Apply initial database migrations:**
    ```bash
    wasp db migrate-dev
    ```

4.  **Create initial dot env file** from the template:
    ```bash
    cp .env.server.example .env.server
    ```

5.  **Last step: run the app!**
    ```bash
    wasp start
    ```