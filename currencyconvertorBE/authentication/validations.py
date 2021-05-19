import re

Email_regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
Password_regrex = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
Mobile_regrex = '^[7-9][0-9]{9}$'


def check_Email(email):
    if(re.search(Email_regex, email)):
        return False
    return True


def check_MobileNumber(mobileNumber):
    print("regrex", re.search(Mobile_regrex, mobileNumber))
    if (re.search(Mobile_regrex, mobileNumber)):
        return False
    return True


def check_Password(password):
    print(re.search(Password_regrex, password))
    if(re.search(Password_regrex, password)):
        return False
    return True


def parameter_Validation_Checker(attribute, attribute_value, request):
    if attribute is None or attribute == "":
        Message = attribute_value + " Is Required"
        data = {
            "Message": Message,
            "data": request.data
        }
        return data
    return False


def signUpView_Validation(request):
    try:
        firstname = request.data.get("firstname")
        Response = parameter_Validation_Checker(
            firstname, "firstname", request)
        if Response:
            return Response

        lastname = request.data.get("lastname")
        Response = parameter_Validation_Checker(
            lastname, "lastname", request)
        if Response:
            return Response

        email = request.data.get("email")
        Response = parameter_Validation_Checker(
            email, "email", request)
        if Response:
            return Response

        Response = check_Email(str(email))
        if Response:
            Message = "Invalid Email Id. Example : vishalpwaman@gmail.com"
            data = {
                "Message": Message,
                "data": request.data
            }
            return data

        password = request.data.get("password")
        Response = parameter_Validation_Checker(password, "password", request)
        if Response:
            return Response

        Response = check_Password(str(password))
        print(Response)
        if Response:
            Message = "Use 8 or more characters with a mix of letters, numbers & symbols"
            data = {
                "Status": "Failed",
                "Message": Message,
                "data": request.data
            }
            return data

        confirmpassword = request.data.get("confirmpassword")
        Response = parameter_Validation_Checker(
            confirmpassword, "confirmpassword", request)
        if Response:
            return Response

        return False

    except:
        data = {
            "Message :": "Error In validation",
            "data :": request.data
        }
        return data


def EmailView_Validation(request):
    try:
        email = request.data.get("email")
        Response = parameter_Validation_Checker(
            email, "email", request)
        if Response:
            return Response

        Response = check_Email(str(email))
        if Response:
            Message = "Invalid Email Id. Example : vishalpwaman@gmail.com"
            data = {
                "Message": Message,
                "data": request.data
            }
            return data
        return False

    except:
        data = {
            "Message ": "Error In Validation",
            "data ": request.data
        }
        return data


def signInPasswordView_Validation(request):
    try:
        email = request.data.get("email")
        Response = parameter_Validation_Checker(
            email, "email", request)
        if Response:
            return Response

        Response = check_Email(str(email))
        if Response:
            Message = "Invalid Email Id. Example : vishalpwaman@gmail.com"
            data = {
                "Message": Message,
                "data": request.data
            }
            return data
        return False

        password = request.data.get("password")
        Response = parameter_Validation_Checker(password, "password", request)
        if Response:
            return Response

    except:
        data = {
            "Message ": "Error In Validation",
            "data ": request.data
        }
        return data
