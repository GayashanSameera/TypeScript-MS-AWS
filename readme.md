# Audit trail urls

## API for check audit trail -

```
`POST` > `https://gllr1l6712.execute-api.eu-west-2.amazonaws.com/dev/tpip/v1/trail/ql/{domain}`
```

## API for AuditTrail health check -

```
`GET` > `https://gllr1l6712.execute-api.eu-west-2.amazonaws.com/dev/tpip/v1/trail/health-check`
```

## domains -

- scheme
- user
- comment
- workflow
- tasks

## body params -

```
{
    "deepQuery": true,              //with all data set
    "fields": "id, firstName",      //select fields
    "sort": {
        "key": "loggedAt",
        "order": "DESC"
    },
    "from": 0,                      //pagination
    "size": 5,                      //pagination
    "query": "id=yourid"            // sql query
}
```

## sample object -

```
{
    id: '85ee3a80-e0dc-11e9-a51c-91a3a557e014',
    loggedAt: 2019-09-27T04:08:55.592Z,
    actionOwner: 'lgim2@lgim.co.uk', //onLogin,onSignOut haven't actionOwner
    then:
    { },
    now:{},
    domain: 'user',
    action: 'onUpdateUserDetails',
    email : 'lgim2@lgim.co.uk' //only for onLogin,onSignOut haven't actionOwner
}
```

## domain wise action -

### user domain actions -

- onUserRegistration
- onUserConfirmation
- onLogin
- onSignOut
- onUpdateUserDetails
- onChangePassword

### scheme domain actions -

- onCreateScheme
- onUpdateToFavorite
- onAddUserToScheme
- onActivateScheme

### workflow domain actions -

- onSaveCreateProposal
- onCreateProposal
- onUpdateProposal
- onUploadProposal
- onPublishProposal
- onContinueDownloadProposal
- onApproveInitialProposal
- onSaveRequestIAA
- onRequestIAA
- onApproveIAA_KYC
- onGenerateIAA_ML
- onRemoveIAA_ML_Doc
- onUploadIAA_ML
- onPublishIAA_ML
- onApproveIAA
- onReviewIAA
- onRequestIAAexecution
- onSaveIAAexecution
- onSaveRequestAMAOD
- onRequestAMAOD
- onApproveAMAOD
- onRemoveAMAODdocuments
- onUploadAMAODdocuments
- onGenerateAMAODdocuments
- onPublishAMAODdocuments
- onApproveAdvisory
- onApproveFMA
- onApprovePMC
- onReviewAdvisory
- onReviewFMA
- onReviewPMC
- onRequestFMAPMCExecution
- onSaveFMAPMCExecution
- onRemoveMTL
- onUploadMTL
- onGenarateMTL
- onPublishMTL
- onApproveMTL
- onReviewMTL
- onDownloadProposal
- onDownloadIAA_KYC
- onDownloadAMAO
- onAssignUserToStep
- onAddtrustee

### Active Workflow Domain Actions -
#### Request to Cancel Workflow -
- onRTCRequestCancelAccount - Initiate scheme cancellation
- onRTCLGIMProcessRequest - LGIM approve or reject scheme cancellation request
- onRTCTrusteeApproval - Trustee approval for scheme cancellation request
- onRTCDeactivateAccount - Deactivate scheme account

#### Bespoke advice report Workflow -
- onGenerateTransitionReport - Upload/Generate bespoke report
- onApproveTransitionReport - Approve/Reject bespoke report
- onPublishTransitionReport - Publish bespoke report

#### Funding Level Triggers Workflow -
- onAddFundingLvlTrigger - Add funding level trigger
- onUpdateFundingLvlTrigger - Update funding level trigger
- onDeleteFundingLvlTrigger - Delete funding level trigger

### comment domain actions -

- onAddNewComments

### tasks domain actions -

- onSaveTasks,
- onMarkAsRead_Tasks,
- onDeleteTasks
