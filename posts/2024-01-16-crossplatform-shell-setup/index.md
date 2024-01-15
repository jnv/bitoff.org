sequenceDiagram
    actor U as User
    participant A as Consumer App
    participant P as Provider
    U->>+A: I want to login with "Provider"
    activate U
    A-->>-U: Go to this URL
    U->>+P: I want to login to Consumer App
    P-->>U: Sure, do you want to login with Consumer App?
    U->>P: Yes!
    P-->>-U: OK, here's authorization code, go back to this URL
    U->>+A: Here's my authorization code
    A->>+P: Here's auth code, gimme access token
    P-->>-A: Auth code is legit, here's access token for User
    A-->>-U: OK, you're logged in!
    deactivate U
