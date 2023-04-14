// dllmain.cpp : Defines the entry point for the DLL application.
#include "pch.h"
#include "Header.h"


#define CMD_GROUP_NAME _T("MY_CMD_GROUP")
using namespace std;
using json = nlohmann::json;


const wstring point = _T("0");
const wstring line = _T("1");
const wstring arc = _T("2");
const wstring polyline = _T("3");

void selection() {
    Json j;
    json ass = json::array();
    j.assget(ass);
}



void initApp() {

    acutPrintf(_T("\nExample Application Loaded"));

    acedRegCmds->addCommand(CMD_GROUP_NAME, _T("ADD_LINE"), _T("get"), ACRX_CMD_MODAL | ACRX_CMD_USEPICKSET | ACRX_CMD_REDRAW, selection);

}


void unloadApp() {
    acutPrintf(_T("\nExample Application Unloaded"));
    acedRegCmds->removeGroup(CMD_GROUP_NAME);
}


extern "C" AcRx::AppRetCode
acrxEntryPoint(AcRx::AppMsgCode msg, void* appId)
{
    switch (msg) {
    case AcRx::kInitAppMsg:
        acrxUnlockApplication(appId);
        acrxRegisterAppMDIAware(appId);
        initApp();
        break;
    case AcRx::kUnloadAppMsg:
        unloadApp();
        break;
    }
    return AcRx::kRetOK;
}
