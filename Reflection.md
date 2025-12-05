•	How did adding a JWT-based login/registration flow (with client-side validation) deepen your full-stack perspective?

o	Adding JWT-based login/registration flow (with client-side validation) deepened my full-stack perspective by showing complex and tightly woven the front-end and back-end must be and work together in order to create a secure product/application.  In addition, adding the client -side validations for the different fields – e.g. email, password, and password confirmation – helped me better understand the security involved on both sides of the application.  Overall, I felt that the complexity offered a greater appreciation for professional and fully fleshed out applications such as this one is turning into.

•	Discuss the role of Playwright E2E tests in verifying login/registration flows, especially for both valid/invalid scenarios.

o	I saw the role of Playwright E2E tests in verifying login/registration flows, especially for both valid/invalid scenarios allowed me to test real browser interactions from the end user side.  It truly enforced the complexity in creating security for users specifically through the submission of invalid emails, short passwords, and wrong credentials when logging in and registering.  These are issues I would have never seen with the unit tests alone.

•	Which client-side checks (password length/email format) and JWT token storage strategies did you employ, and how do these complement server-side security?

o	The client-side checks that I employed was password length/valid registration info (longer passwords means lower risk to potential account breeches) and successful login/invalid password login (error messages concerning this may deter further security breech attempts, informs users, and store correct token in accordance with correct credentials.

•	Summarize any difficulties (JWT generation/verification, storing tokens, Docker environment for E2E) and how you overcame them.
o	There were many challenges I faced, specifically the running the new playwright e2e tests in GitHub Actions environment.  It proved extremely difficult and I’m still unsure about it.
