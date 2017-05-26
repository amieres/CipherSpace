-- for Testing
--DECLARE @ClientCode    varchar(50)
--DECLARE @LanguageCode varchar(50)
--SET @ClientCode = 'Genesis'
--SET @LanguageCode = 'spa'

   SELECT p.parameter_code
	    , name = IsNull(CS.labelDescription(@LanguageCode, p.label_code), c.parameter_code)
        , parameter_value
     FROM CS.Client_Parameter c
LEFT JOIN CS.Parameter        p on p.parameter_code = c.parameter_code
    WHERE Client_Code = @ClientCode
