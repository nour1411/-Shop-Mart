
export interface SuccessLoginResponse{
    message:string
    user:UserResponse
    token:string
}
export interface FailedLoginResponse{
   statusMsg:string,
   message:string
}

export interface UserResponse{
    name:string
    email:string
    role:string
}
