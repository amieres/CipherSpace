(*** hide ***)
#I @"C:\Users\Abelardo\OneDrive - Cipher Business Solutions\Clientes\Houston\CIPHERTool"

(**
The FINTRANS View
===============================

For each stream there is a view called `<STREAM>.VW_FG_FIN_TRANS2` in the **`ARStaging`** database. 
Each view is defined in a F# script file called `<STREAM>_FG_FIN_TRANS.fsx`

* Library stream: `ARStaging.HPL.VW_FG_FIN_TRANS2` view defined in `HPL_FG_FIN_TRANS.fsx`
* Legal stream: `ARStaging.HCTO.VW_FG_FIN_TRANS2` view defined in `HCTO_FG_FIN_TRANS.fsx`
* Public Works stream: `ARStaging.PWE.VW_FG_FIN_TRANS2` view defined in `PWE_FG_FIN_TRANS.fsx`
* Health stream: `ARStaging.HHD.VW_FG_FIN_TRANS2` view defined in `HHD_FG_FIN_TRANS.fsx`
* Courts stream: `ARStaging.MCD.VW_FG_FIN_TRANS2` view defined in `MCD_FG_FIN_TRANS.fsx`
* Secondary Emergency stream: `ARStaging.EMS_MSB.VW_FG_FIN_TRANS2` view defined in `EMS_MSB_FG_FIN_TRANS.fsx`

Al views are identical, and are joined together in the SQL Server table-valued function `ARStaging.GENERIC.FN_SOURCE_FG_FIN_TRANS2`:
```
ALTER FUNCTION GENERIC.FN_SOURCE_FG_FIN_TRANS2(@SOURCE VARCHAR(40), @CURRENT_DTE DATE = NULL)
RETURNS TABLE 
AS RETURN
	WITH Data as (
        SELECT * FROM EMS_MSB.VW_FG_FIN_TRANS2    UNION ALL
        SELECT * FROM HPL.VW_FG_FIN_TRANS2        UNION ALL
        SELECT * FROM PWE.VW_FG_FIN_TRANS2        UNION ALL
        SELECT * FROM MCD.VW_FG_FIN_TRANS2        UNION ALL
        SELECT * FROM HCTO.VW_FG_FIN_TRANS2       UNION ALL
        SELECT * FROM HHD.VW_FG_FIN_TRANS2        
	)
	SELECT *
	  FROM Data
	 WHERE SRC_SYS = @SOURCE
       AND DTE <= ISNULL(@CURRENT_DTE, GETDATE())
```

*)

(** 
How to run the script to generate the view
------------------------------------------

At the top of the `<STREAM>_FG_FIN_TRANS.fsx` file there is a section commented out like the following:

```
(*
(*keep*)#load "BetterFSI.fsx"  // <<<==== Execute once in F# Interactive

Do __SOURCE_FILE__ __LINE__ //   HCTOView.Query |> BetterFSI.Copy 
Do __SOURCE_FILE__ __LINE__ //
Do __SOURCE_FILE__ __LINE__ //
*)
```

In Visual Studio put the cursor on the line that says `(*keep*)#load "BetterFSI.fsx"` and execute by using right-click and **`Execute in Interactive`**.
This needs to be done only once at the beginning of a session. 

To create the view put the cursor on the line that says `HCTOView.Query |> BetterFSI.Copy` and execute in interactive. This message will show in F# Interactive:
`
Copied to clipboard: 
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HCTO].[VW_FG_FIN_TRANS2]') AND ...
`
indicating the SQL query is in the clipboard. Then just paste it into a Sql Server Manager Query window and execute to create/alter the view.

Defining the view 
-----------------

The view definition starts by including the F# script `SlowlyChangingDimensionPlus.fsx` 
and opening the modules `SlowlyChangingDimensionPlus` and `Fields`. 
The `Fields` module is defined in the file `Fields.fsx`.
*)

#load "SlowlyChangingDimensionPlus.fsx"

open SlowlyChangingDimensionPlus
open Fields
(**
The view is defined by creating a `FactView` object
*)
let HCTOView =
    FactView (
        name   = SQLTableView.New "" "HCTO" "VW_FG_FIN_TRANS2        " "" ""
      , source = SQLTableView.New "" "HCTO" "VW_FG_FIN_TRANS_STEP0   " "" ""
(**
The `name = ` parameter indicates the target view name parts in double quotes: `DB`, `Schema` and view name.
For the target `DB` must be empty `""`.

Simmilarly the `source = ` parameter indicates the source view/table for this view (the `FROM` part of the query).
The source view must have resolved most of the calculations required leaving the FinTrans view to basically map 
the field names with minimal calculations done in this query. A good exception to this rule are those fields that 
need to use the prefix that identifies the stream, `'HCTO'` in this example, fields like `SRC_SYS` and `SRC_SYS_ID`:
*)
      , fields = [
                vwField SRC_SYS                             "'HCTO'                                                          "
                vwField SRC_SYS_ID                          "'HCTO-' + SRC_SYS_ID                                            "
(**

The fields are defined by calling vwField passing the field name 
and the SQL value expression between double quotes `"'HCTO-' + SRC_SYS_ID "`.
All valid field names are pre-defined in the file `Fields.fsx`. 
Only those fields with actual data need to be included in this definition. 
Those that are not included will be automatically added by the script using the default value.
Default values are defined in the file `FieldDefault.fsx`.

*)                                                                                                                     
                vwField BUS_AREA_ID                         "'9000'                                                          "
// DIM_CARRIER                                                                                                                  
                vwField CARRIER_SRC                         "'HCTO'                                                          "
// DIM_CARRIER PROCEDURE                                                                                                       
                vwField CARRIER_PROCEDURE_SRC               "'HCTO'                                                          "
// DIM_COH_ORG                                                                                                                  
                vwField DEPT_LONG_NAME                      "'Legal Department'                                              "
                vwField DIV_LONG_NAME                       "'Treasury'                                                      "
// DIM_COLL_PERSON                                                                                                              
                vwField COLL_PERSON_ID                      "'HCTO-111'                                                      "
                vwField COLL_PERSON_NAME                    "'Harris County Employee'                                        "
                vwField DIGITECH_ID                         "'HCTO generic'                                                  "
                vwField HCTO_AD_VAL_ID                      "'Harris County Employee'                                        "
                vwField COLL_PERSON_TYPE                    "'COH Contractor'                                                "
                
// DIM_CONTR                                                                                                                     
                vwField CONTR_ID                            "'4600013183'                                                    "
// DIM_CUST                                                                                                                      
                vwField CUST_ID                             "'HCTO-'+ CAN                                                    "
                vwField CONFI_CUST_FLAG                     "'N'                                                             "
                vwField CUST_NAME                           "NAMELINE1                                                       "
                vwField CUST_IS_VEND_FLAG                   "'N'                                                             "
                vwField JV_CUST_FLAG                        "'N'                                                             "
                vwField CUST_ADDR_LINE_1                    "NAMELINE2                                                       "
                vwField CUST_ADDR_LINE_2                    "NAMELINE3                                                       "
                vwField CUST_ADDR_LINE_3                    "NAMELINE4                                                       "
                vwField CUST_IN_CITY_FLAG                   "IIF(CITY='HOUSTON','Y','N')                                     "
                vwField CUST_CITY                           "CITY                                                            "
                vwField CUST_STATE                          "STATE                                                           "
                vwField CUST_CTRY                           "COUNTRY                                                         "
                vwField CUST_ZIP_CODE                       "SUBSTRING(ZIPCODE,1,5)                                          "
                vwField CUST_ZIP_PLUS_4                     "SUBSTRING(ZIPCODE,1,13)                                         "
// DIM_CUST_PAR                                                                                                                  
// DIM DTE                                                                                                                       
                vwField DTE                                 "TRANS_DTE                                                       "
// DIM EMP                                                                                                                       
                vwField EMP_TYPE                            "'COH Contractor'                                                "
                vwField EMP_NAME                            "'Harris County Employee'                                        "
                vwField COH_EMP_NUM                         "'HCTO-111'                                                      "
// DIM_FIN_TRANS_TYPE                                                                                                            
                vwField MSTR_TRANS_TYPE                     "MSTR_TRANS_TYPE                                             "
                vwField DET_TRANS_DESCR                     "DET_TRANS_DESCR                                                 "
                vwField DET_TRANS_CODE                      "'HCTO-' + MSTR_TRANS_TYPE                                       "
// DIM INCDT                                                                                                                     
                vwField INV_NUM                             "SRC_SYS_ID                                                      "
                vwField INCDT_DESCR                         "'Property ownership'                                            "
                vwField INCDT_TYPE                          "'Property ownership'                                            "
                vwField INCDT_CAT                           "'Property ownership'                                            "
                vwField INCDT_DTE                           "CONVERT(DATETIME,'10/1/'+CONVERT(VARCHAR(4),YEAR))              "
                vwField INCDT_ADDR_LINE_1                   "CONVERT(VARCHAR,PNUMBER)+' '+PSTRNAME                         "
                vwField INCDT_ST_NUM                        "PNUMBER                                                         "
                vwField INCDT_ST_NAME                       "PSTRNAME                                                        "
                vwField INCDT_IN_CITY_FLAG                  "'Y'                                                             "
                vwField INCDT_STATE                         "'Texas'                                                         "
                vwField INCDT_CTRY                          "'USA'                                                           "
                vwField INCDT_ZIP_CODE                      "SUBSTRING(PZIP,1,5)                                             "
// DIM_ITEM                                                                                                                      
                vwField ITEM_TYPE                           "'Ad Valorem Property'                                           "
                vwField ITEM_ADDR_LINE_1                    "CONVERT(VARCHAR,PNUMBER)+' '+PSTRNAME                           " 
                vwField ITEM_ST_NUM                         "CONVERT(VARCHAR(13),PNUMBER)                                    "
                vwField ITEM_ST_NAME                        "PSTRNAME                                                        "
                vwField ITEM_IN_CITY_FLAG                   "'Y'                                                             "
                vwField ITEM_STATE                          "'Texas'                                                         "
                vwField ITEM_DESCR                          "'Property ownership'                                            "
                vwField ITEM_ZIP_CODE                       "SUBSTRING(PZIP,1,5)                                             "
// DIM ITEM DET
//                vwField TAXABLE_PROP_ROLL_TYPE              "Roll Type                                          "            
//                vwField NUM_OF_ACRES                        "LEGACRES                                                        "
//                vwField PROP_CLASS_CODE                     "PROPCLASS                         " 
//                vwField CITY_RFPD_JURIS_CODE                "'61'        " 
//                vwField CONFI_ACCT_FLAG                     "'N' " 
//                vwField TAX_DEFERRAL_START_DTE              "TAXDEFSTRT                                                      "
//                vwField TAX_DEFERRAL_END_DTE                "TAXDEFEND                                                     " 
//                vwField OWNERSHIP_EFF_DTE                   "CONVERT(DATETIME,'1900-01-01 00:00:00.000') " 
//                vwField APPRAISAL_DISTR_ACCT_NUM            "SUBSTRING(CAN,1,16) " 
//                vwField TAXABLE_PROP_LGL_DESCR_1            "LEGAL1                                                          "
//                vwField TAXABLE_PROP_LGL_DESCR_2            "LEGAL2                                                          "
//                vwField TAXABLE_PROP_LGL_DESCR_3            "LEGAL3                                                          "
//                vwField TAXABLE_PROP_LGL_DESCR_4            "LEGAL4                                                          "
//                vwField TAXABLE_PROP_LGL_DESCR_5            "LEGAL5                                                          "
//                vwField TAX_ROLL_CODE                       "ROLL                                                            "
//                vwField PROP_CLASS_DESCR                    "Property_Description                                            "
//                vwField CITY_RFPD_JURIS_DESCR               "'HOUSTON, CITY OF'                                             "
//                vwField TAX_ROLL_DESCR                      "Roll Type                                         "
//                vwField CAN                                 "SUBSTRING(F.CAN,1,16) "
// DIM_RECEIVABLE
                vwField RECEIVABLE_EVER_TRANS_FLAG      "'N'                                                                 "
                vwField RECEIVABLE_VERS_DELINQ_DTE      "DELINQ_DTE                                                          "
                vwField RECEIVABLE_VERS_DUE_DTE         "DUEDATE                                                             "
                vwField RECEIVABLE_VERS_ISSUE_DTE       "CONVERT(DATETIME,'10/1/'+CONVERT(VARCHAR(4), YEAR))                 "
                vwField RECEIVABLE_VERS_TO_DTE          "CONVERT(DATETIME,'10/1/'+CONVERT(VARCHAR(4), YEAR))                 "
                vwField VERS_ASSIGNED_VEND              "'0000106846'                                                        "
                vwField ORIG_BILL_NAME                  "NAMELINE1                                                           "
                vwField UNK_CUST_AT_BILL_FLAG           "'N'                                                                 "
// Dim_Receivable_Det DIM_RECEIVABLE_AD_VAL_RECEIVABLE_DET
//                vwField AD_VAL_VET_FLAG                  "VETERAN                                                            "
//                vwField AD_VAL_DISABLED_FLAG             "DISABLED                                                           "
//                vwField AD_VAL_OVER_66_FLAG              "OVER65                                                             "
//                vwField AD_VAL_HOMESTEAD_FLAG            "HOMESTEAD                                                          "
//                vwField HCAD_ACCT_STAT                   "CAN                                                                "
//                vwField AD_VAL_TAX_DEFERRAL_START_DTE    "TAXDEFSTRT                                                        "
//                vwField AD_VAL_TAX_DEFERRAL_END_DTE      "TAXDEFEND                                                         "
//                vwField 3348_ATTY_FEE_DTE                "DATE_3348                                                         "
//                vwField 3308_ATTY_FEE_DTE                "DATE_3308                                                         "
//                vwField 3307_ATTY_FEE_DTE                "DATE_3307                                                         "


// FG_FIN_TRANS
                vwField TRANS_AMT                           "TRANS_AMT	                                                       "      
                vwField SRC_SYS_TRANS_ID                    "'HCTO'                                                            "      
              
                vwField POST_DTE                            "TRANS_DTE                                                          "                               
        ]
)
             
(**
The Query
----------

The resulting query will have all necessary fields in alphabetical order. 
Data conversion and null checks are added automatically to ensure compatibility 
with the final tables. The type declaration of each field is in the file `FieldDecl.fsx`.

```
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[HCTO].[VW_FG_FIN_TRANS2]') AND type =    N'V')
    DROP VIEW [HCTO].[VW_FG_FIN_TRANS2];
GO
-- Machine-generated-code, DO NOT MODIFY HERE
-- [HCTO].[VW_FG_FIN_TRANS2] 'HPL', '2017-03-01'
CREATE VIEW [HCTO].[VW_FG_FIN_TRANS2]

 as SELECT ADJ_FLAG                                 = 'N'
        , ALLOC_TRANS_FLAG                         = '*'
        , BILLED_FLAG                              = 'Y'
        , BLK_NUM                                  = '***'
        , BOOT_SERIAL_NUM                          = '***'
        , BUS_AREA_ID                              = ISNULL(CONVERT(varchar(4), '9000'), '6400')
        , BUS_CONT_PERSON_NAME                     = '***'
        , CARRIER_FIN_CLASS                        = '(SYS) UNKNOWN'
        , CARRIER_FIN_GRP                          = '(SYS) UNKNOWN'
        , CARRIER_GRP                              = '(SYS) UNKNOWN'
        , CARRIER_NAME                             = '(SYS) UNKNOWN'
        , CARRIER_PROCEDURE_BILL_CODE              = '(SYS) UNKNOWN'
        , CARRIER_PROCEDURE_CODE                   = '(SYS) UNKNOWN'
        , CARRIER_PROCEDURE_DESCR                  = '(SYS) UNKNOWN'
        , CARRIER_PROCEDURE_SRC                    = ISNULL(CONVERT(varchar(120), 'HCTO'), '***')
        , CARRIER_PROCEDURE_TYPE                   = '(SYS) UNKNOWN'
        , CARRIER_SRC                              = ISNULL(CONVERT(varchar(120), 'HCTO'), '***')
        , COH_EMP_NUM                              = ISNULL(CONVERT(varchar(8), 'HCTO-111'), '***')
        , COLL_PERSON_ID                           = ISNULL(CONVERT(varchar(20), 'HCTO-111'), '***')
        , COLL_PERSON_NAME                         = ISNULL(CONVERT(varchar(120), 'Harris County Employee'), 'Employee')
        , COLL_PERSON_TYPE                         = ISNULL(CONVERT(varchar(40), 'COH Contractor'), 'COH Contractor')
        , CONFI_CUST_FLAG                          = ISNULL(CONVERT(varchar(1), 'N'), 'Y')
        , CONTR_ID                                 = ISNULL(CONVERT(varchar(10), '4600013183'), '4600012363')
        , CUST_ADDR_LINE_1                         = ISNULL(CONVERT(varchar(200), NAMELINE2), '***')
        , CUST_ADDR_LINE_2                         = ISNULL(CONVERT(varchar(200), NAMELINE3), '***')
        , CUST_ADDR_LINE_3                         = ISNULL(CONVERT(varchar(200), NAMELINE4), '***')
...
        , TRANS_AMT                                = CONVERT(money, TRANS_AMT)
        , TRANS_CNT                                = 1
        , UNK_CUST_AT_BILL_FLAG                    = CONVERT(varchar(1), 'N')
        , VERS_ASSIGNED_VEND                       = CONVERT(varchar(120), '0000106846')
        , VIO_CODE                                 = '***'
 FROM [HCTO].[VW_FG_FIN_TRANS_STEP0];
; 
GO
```

*)

       