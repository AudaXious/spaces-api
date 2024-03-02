//400
export const ErrInvalidEmail = new Error("Invalid email");
export const ErrInvalidPassword = new Error("Invalid password");
export const ErrTokenIsRequired = new Error("User authentication token is required");
export const ErrInvalidOTP = new Error("Invalid OTP");


//406
export const ErrMissingKeyFields = new Error("Missing Key Fields");
export const ErrMissingHeader = new Error("Missing request header")

//409
export const ErrEmailAlreadyExists = new Error("Email already exists");
export const ErrResourceAlreadyExists = new Error("Resource already exists");

//404
export const ErrResourceNotFound = new Error("Resource not found");
export const ErrUserNotFound = new Error("No user found");
export const ErrFearNotFound = new Error("Fear not found");
export const ErrCommunityNotFound = new Error("Community not found");
export const ErrForumNotFound = new Error("Forum not found");

//401
export const ErrUnauthorized = new Error("User not authorized");
export const ErrAccountNotVerified = new Error("Account not verified");


//500
export const ErrInternalServer = new Error("Internal server error");


export const getErrorMessage = (error) => {
    let message = error.toString().replace("Error: ", "");
    let code  = 0;

    switch(error){
        case ErrInvalidEmail:
        case ErrInvalidPassword:
        case ErrTokenIsRequired:
        case ErrInvalidOTP:
            code = 400;
            break;
        
        case ErrUnauthorized:
        case ErrAccountNotVerified:
            code = 401;
            break;

        case ErrResourceNotFound:
        case ErrUserNotFound:
        case ErrFearNotFound:
        case ErrCommunityNotFound:
        case ErrForumNotFound:
            code = 404;
            break;

        case ErrMissingKeyFields:
        case ErrMissingHeader:
            code = 406;
            break;

        case ErrEmailAlreadyExists:
        case ErrResourceAlreadyExists:
            code = 409;
            break;

        case ErrInternalServer:
            code = 500;
            break;
        
        default:
            code = 500;
            break;
    }
    const result = {
        code,
        message,
    }

    return result;
}