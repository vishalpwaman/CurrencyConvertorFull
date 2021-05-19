class ConversionService:

    @staticmethod
    def Conversions(request):
        try:
            EURToUSD = 1.22
            EURToGBP = 0.86
            EURTONZD = 1.68
            EURToAUD = 1.57
            EURToJPY = 133.09
            EURToHUF = 350.27

            EURToINR = 89.39
            EURToTRY = 10.28
            EURToQAR = 4.45

            USDToGBP = 0.70
            USDToNZD = 1.38
            USDToAUD = 1.28
            USDToJPY = 108.95
            USDToHUF = 286.73

            USDToINR = 73.22
            USDToTRY = 8.24
            USDToQAR = 3.64

            GBPToNZD = 1.96
            GBPToAUD = 1.82
            GBPToJPY = 154.55
            GBPToHUF = 406.95

            GBPToINR = 103.64
            GBPToTRY = 11.92
            GBPToQAR = 5.15

            NZDToAUD = 0.93
            NZDToJPY = 78.82
            NZDToHUF = 207.49

            NZDToINR = 52.55
            NZDToTRY = 6.05
            NZDToQAR = 2.61

            AUDToJPY = 84.85
            AUDToHUF = 223.36

            AUDToINR = 56.64
            AUDToTRY = 6.51
            AUDToQAR = 2.82

            JPYToHUF = 2.63

            JPYToINR = 0.67
            JPYToTRY = 0.077
            JPYToQAR = 0.033

            HUFToINR = 0.26
            HUFToTRY = 0.029
            HUFToQAR = 0.013

            INRToTRY = 0.11
            INRToQAR = 0.050

            TRYToQAR = 0.43

            # print("flag 11")
            Type1 = request.data.get("CurrencyInputType")
            Type2 = request.data.get("CurrencyOutputType")
            Type = str(Type1)+"To"+str(Type2)
            InputValue = float(request.data.get("CurrencyInputValue"))
            print("flag 12")
            # Equal Currency Conversion

            if Type == "EURToEUR":
                return InputValue

            if Type == "USDToUSD":
                return InputValue

            if Type == "GBPToGBP":
                return InputValue

            if Type == "NZDToNZD":
                return InputValue

            if Type == "AUDToAUD":
                return InputValue

            if Type == "JPYToJPY":
                return InputValue

            if Type == "HUFToHUF":
                return InputValue

            if Type == "INRToINR":
                return InputValue

            if Type == "TRYToTRY":
                return InputValue

            if Type == "QARToQAR":
                return InputValue

            # Multiplication

            if Type == "EURToUSD":
                # print("EUR To USD", InputValue*EURToUSD)
                return InputValue*EURToUSD

            if Type == "EURToGBP":
                return InputValue*EURToGBP

            if Type == "EURToNZD":
                return InputValue*EURTONZD

            if Type == "EURToAUD":
                return InputValue*EURToAUD

            if Type == "EURToJPY":
                return InputValue*EURToJPY

            if Type == "EURToHUF":
                return InputValue*EURToHUF

            if Type == "EURToINR":
                return InputValue*EURToINR

            if Type == "EURToTRY":
                return InputValue*EURToTRY

            if Type == "EURToQAR":
                return InputValue*EURToQAR

            if Type == "USDToGBP":
                return InputValue*USDToGBP

            if Type == "USDToNZD":
                return InputValue*USDToNZD

            if Type == "USDToAUD":
                return InputValue*USDToAUD

            if Type == "USDToJPY":
                return InputValue*USDToJPY

            if Type == "USDToHUF":
                return InputValue*USDToHUF

            if Type == "USDToINR":
                return InputValue*USDToINR

            if Type == "USDToTRY":
                return InputValue*USDToTRY

            if Type == "USDToQAR":
                return InputValue*USDToQAR

            if Type == "GBPToNZD":
                return InputValue*GBPToNZD

            if Type == "GBPToAUD":
                return InputValue*GBPToAUD

            if Type == "GBPToJPY":
                return InputValue*GBPToJPY

            if Type == "GBPToHUF":
                return InputValue*GBPToHUF

            if Type == "GBPToINR":
                return InputValue*GBPToINR

            if Type == "GBPToTRY":
                return InputValue*GBPToTRY

            if Type == "GBPToQAR":
                return InputValue*GBPToQAR

            if Type == "NZDToAUD":
                return InputValue*NZDToAUD

            if Type == "NZDToJPY":
                return InputValue*NZDToJPY

            if Type == "NZDToINR":
                return InputValue*NZDToINR

            if Type == "NZDToTRY":
                return InputValue * NZDToTRY

            if Type == "NZDToQAR":
                return InputValue*NZDToQAR

            if Type == "NZDToHUF":
                return InputValue*NZDToHUF

            if Type == "AUDToJPY":
                return InputValue*AUDToJPY

            if Type == "AUDToHUF":
                return InputValue*AUDToHUF

            if Type == "AUDToINR":
                return InputValue*AUDToINR

            if Type == "AUDToTRY":
                return InputValue*AUDToTRY

            if Type == "AUDToQAR":
                return InputValue*AUDToQAR

            if Type == "JPYToHUF":
                return InputValue*JPYToHUF

            if Type == "JPYToINR":
                return InputValue*JPYToINR

            if Type == "JPYToTRY":
                return InputValue*JPYToTRY

            if Type == "JPYToQAR":
                return InputValue*JPYToQAR

            if Type == "INRToTRY":
                return InputValue*INRToTRY

            if Type == "INRToQAR":
                return InputValue*INRToQAR

            if Type == "TRYToQAR":
                return InputValue*TRYToQAR

            # Divide # Reverse Operation

            if Type == "USDToEUR":
                return InputValue/EURToUSD

            if Type == "GBPToEUR":
                return InputValue/EURToGBP

            if Type == "NZDToEUR":
                return InputValue/EURTONZD

            if Type == "AUDToEUR":
                return InputValue/EURToAUD

            if Type == "JPYToEUR":
                return InputValue/EURToJPY

            if Type == "HUFToEUR":
                return InputValue/EURToHUF

            if Type == "INRToEUR":
                return InputValue/EURToINR

            if Type == "TRYToEUR":
                return InputValue/EURToTRY

            if Type == "QARToEUR":
                return InputValue/EURToQAR

            if Type == "GBPToUSD":
                return InputValue/USDToGBP

            if Type == "NZDToUSD":
                return InputValue/USDToNZD

            if Type == "AUDToUSD":
                return InputValue/USDToAUD

            if Type == "JPYToUSD":
                return InputValue/USDToJPY

            if Type == "HUFToUSD":
                return InputValue/USDToHUF

            if Type == "INRToUSD":
                return InputValue/USDToINR

            if Type == "TRYToUSD":
                return InputValue/USDToTRY

            if Type == "QARToUSD":
                return InputValue/USDToQAR

            if Type == "NZDToGBP":
                return InputValue/GBPToNZD

            if Type == "AUDToGBP":
                return InputValue/GBPToAUD

            if Type == "JPYToGBP":
                return InputValue/GBPToJPY

            if Type == "HUFToGBP":
                return InputValue/GBPToHUF

            if Type == "INRToGBP":
                return InputValue/GBPToINR

            if Type == "TRYToGBP":
                return InputValue/GBPToTRY

            if Type == "QARToGBP":
                return InputValue/GBPToQAR

            if Type == "AUDToNZD":
                return InputValue/NZDToAUD

            if Type == "JPYToNZD":
                return InputValue/NZDToJPY

            if Type == "HUFToNZD":
                return InputValue/NZDToHUF

            if Type == "INRToNZD":
                return InputValue/NZDToINR

            if Type == "TRYToNZD":
                return InputValue / NZDToTRY

            if Type == "QARToNZD":
                return InputValue/NZDToQAR

            if Type == "JPYToAUD":
                return InputValue/AUDToJPY

            if Type == "HUFToAUD":
                return InputValue/AUDToHUF

            if Type == "INRToAUD":
                return InputValue/AUDToINR

            if Type == "TRYToAUD":
                return InputValue/AUDToTRY

            if Type == "QARToAUD":
                return InputValue/AUDToQAR

            if Type == "HUFToJPY":
                return InputValue/JPYToHUF

            if Type == "INRToJPY":
                return InputValue/JPYToINR

            if Type == "TRYToJPY":
                return InputValue/JPYToTRY

            if Type == "QARToJPY":
                return InputValue/JPYToQAR

            if Type == "TRYToINR":
                return InputValue/INRToTRY

            if Type == "QARToINR":
                return InputValue/INRToQAR

            if Type == "QARToTRY":
                return InputValue/TRYToQAR

            return -1

        except:
            return -1
