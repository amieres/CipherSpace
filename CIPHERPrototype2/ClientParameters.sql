-- for Testing
-- DECLARE @ClientCode varchar(50)

SELECT parameter_code, parameter_value
FROM CS.Client_Parameter
WHERE Client_Code = @ClientCode