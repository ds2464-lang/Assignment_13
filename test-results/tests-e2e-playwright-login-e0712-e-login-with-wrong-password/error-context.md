# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - heading "Calculations App" [level=1] [ref=e3]
    - navigation [ref=e4]:
      - link "Home" [ref=e5] [cursor=pointer]:
        - /url: http://localhost:8000/
      - link "Login" [ref=e6] [cursor=pointer]:
        - /url: http://localhost:8000/login
      - link "Register" [ref=e7] [cursor=pointer]:
        - /url: http://localhost:8000/register
  - main [ref=e8]:
    - generic [ref=e14]:
      - heading "Welcome Back" [level=2] [ref=e15]
      - alert [ref=e16]: Unexpected token 'I', "Internal S"... is not valid JSON
      - alert
      - generic [ref=e17]:
        - generic [ref=e18]:
          - text: Username
          - textbox "Username" [ref=e19]: testuser
        - generic [ref=e20]:
          - text: Password
          - textbox "Password" [ref=e21]: WrongPass123!
        - generic [ref=e22]:
          - generic [ref=e23]:
            - checkbox "Remember me" [ref=e24]
            - text: Remember me
          - link "Forgot password?" [ref=e26] [cursor=pointer]:
            - /url: "#"
        - button "Sign in" [active] [ref=e28]
      - paragraph [ref=e29]:
        - text: Don't have an account?
        - link "Register now" [ref=e30] [cursor=pointer]:
          - /url: /register
  - contentinfo [ref=e31]:
    - paragraph [ref=e32]: © 2025 Calculations App. All rights reserved.
```