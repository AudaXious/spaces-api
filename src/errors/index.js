//400
export const ErrInvalidEmail = new Error("Invalid email");
export const ErrInvalidPassword = new Error("Invalid password");
export const ErrTokenIsRequired = new Error("User authentication token is required");
export const ErrInvalidOTP = new Error("Invalid OTP");
export const ErrInvalidTaskData = new Error("Invalid Task Data");
export const ErrInvalidInviteCode = new Error("Invalid invite code");


//406
export const ErrMissingKeyFields = new Error("Missing Key Fields");
export const ErrMissingHeader = new Error("Missing request header")
export const ErrInvalidDateSelection = new Error("Date selection is not valid")

//409
export const ErrEmailAlreadyExists = new Error("Email already exists");
export const ErrResourceAlreadyExists = new Error("Resource already exists");
export const ErrUserAlreadyHasUsername = new Error("User already has a username")
export const ErrAlreadyJoined = new Error("User is a member of this space");
export const ErrUsernameAlreadyExist = new Error("Username already exists");
export const ErrSpaceAlreadyExists = new Error("Space already exists");
export const ErrAlreadyParticipated = new Error("User already participated in one of this campaigns tasks...");
export const ErrPointsAlreadyClaimed = new Error("User already claimed campaign Points...");


//404
export const ErrResourceNotFound = new Error("Resource not found");
export const ErrUserNotFound = new Error("No user found");
export const ErrMemberNotFound = new Error("Membership data not found");
export const ErrCommunityNotFound = new Error("Community not found");
export const ErrForumNotFound = new Error("Forum not found");

//401
export const ErrUnauthorized = new Error("User not authorized");
export const ErrAccountNotVerified = new Error("Account not verified");
export const ErrVerifyingTwitter = new Error("Twitter account is currently linked to an account")
export const ErrTwitterAccountNotLinked = new Error("Please link twitter account")



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
        case ErrInvalidTaskData:
        case ErrInvalidInviteCode:
            code = 400;
            break;
        
        case ErrUnauthorized:
        case ErrAccountNotVerified:
        case ErrVerifyingTwitter:
        case ErrTwitterAccountNotLinked:
            code = 401;
            break;

        case ErrResourceNotFound:
        case ErrUserNotFound:
        case ErrMemberNotFound:
        case ErrCommunityNotFound:
        case ErrForumNotFound:
            code = 404;
            break;

        case ErrMissingKeyFields:
        case ErrMissingHeader:
        case ErrInvalidDateSelection:
            code = 406;
            break;

        case ErrEmailAlreadyExists:
        case ErrResourceAlreadyExists:
        case ErrAlreadyJoined:            
        case ErrUserAlreadyHasUsername:            
        case ErrUsernameAlreadyExist:            
        case ErrSpaceAlreadyExists:            
        case ErrAlreadyParticipated:            
        case ErrPointsAlreadyClaimed:            
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