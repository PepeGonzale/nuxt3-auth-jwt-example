interface User {
    email: string;
    id: string;
    password:string;
    role:string[]
}

interface UserInput {
    email :string
    password:string
}

interface UserWithoutPassword {
    email: string;
    id: string;
    role:string[]
    
}