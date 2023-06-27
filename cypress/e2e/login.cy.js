describe ("Login Page Test Cases", () => {  // Memberikan Judul Testcase
    it ("Visit Login Page", () =>{
        cy.visit("http://localhost:3000");
        cy.title().should("eq", "React Gallery"); // EQ = Sama dengan
        cy.contains("Hello Again")
    });

    it ("Contains Email and Password Input, and  Login Button", () => {  // Memberikan Judul Testcase
        cy.visit("http://localhost:3000");
        // Check Email
        const email = cy.get("input[name='email']");
        email.should("be.visible");
        email.should("have.attr", "type", "email");
        email.should("have.attr", "placeholder", "Email Address");

        // Check password
        const password = cy.get("input[name='password']");
        password.should("be.visible");
        password.should("have.attr", "type", "password");
        password.should("have.attr", "placeholder", "Password");

         // Check Button
        const button = cy.get("button[type='submit']");
        button.should("be.visible");
        button.contains("Login");
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)");

    });
    
    it("Do Login with null value", () => {
        cy.visit("http://localhost:3000");
        const button = cy.get("button");
        button.click();
        cy.on("window:alert", (text)=>{
            expect(text).to.contains("login failed");
        });
    });

    it("Do login with wrong values", () => {
        cy.visit("http://localhost:3000");

        const email = cy.get("input[name = 'email']");
        email.type("wrong@react.com");
        const password = cy.get("input[name = 'password']");
        password.type("password");

        const button = cy.get("button");
        button.click();
        cy.on("window:alert", (text)=>{
            expect(text).to.contains("login failed");
        });
    });

    it("Do login with correct values", () => {
        cy.visit("http://localhost:3000");

        const email = cy.get("input[name = 'email']");
        email.type("user@react.test");
        const password = cy.get("input[name = 'password']");
        password.type("password");

        const button = cy.get("button");
        button.click();
        cy.on("window:alert", (text)=>{
            expect(text).to.contains("welcome");
        });

        cy.url().should('eq', 'http://localhost:3000/dashboard')
    });


});