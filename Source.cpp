#include"pch.h"
#include "Header.h"
#include <curl/curl.h>

#pragma comment(lib, "libcurl_a")


wstring Json::as_wstring(string s)
{
    return wstring_convert<codecvt_utf8<wchar_t>>().from_bytes(s);
}
string Json::as_string(wstring s)
{
    return string();
}

string as_string(wstring s)
{
    string r;
    transform(s.begin(), s.end(), back_inserter(r), [](wchar_t c) {
        return (char)c;
        });
    return r;
}

void Json::JSON(json& s, AcDbEntity* e) {
    s["id"] = e->id().asOldId();
   // s["color"] = e->entityColor();
    s["linetype"] = as_string(e->linetype());
    s["linetype_scale"] = e->linetypeScale();
    s["lineweight"] = e->lineWeight();
    s["transparency"] = e->transparency().alpha();
    s["material"] = as_string(e->material());
    s["layer"] = as_string(e->layer());
}

void Json::getpoint(AcDbPoint* point, AcDbObjectId id, json& obj)
{    
        AcGePoint3d p;
        p = point->position();
        obj["className"] = "AcDbPoint";
        JSON(obj, point);
        obj["coords"] = { {"x", p.x}, {"y", p.y}, {"z", p.z} };
        obj["thickness"] = point->thickness();
        //acutPrintf(_T("%s"), as_wstring(obj.dump()).c_str());
        point->close();
}
void Json::getpolyline(AcDbPolyline* polyline, AcDbObjectId id, json& obj)
{
        json coords = json::array();
        json coordsang = json::array();
        JSON(obj, polyline);
        int num = polyline->numVerts();
        int test = 0;
        for (int j = 0; j < num; j++) {

            int i = 0;
            AcGeLineSeg2d line;
            AcGeCircArc3d arc;
            AcGePoint2d points;
            polyline->getPointAt(j, points);
            coords.push_back({ {"x", points.x}, {"y", points.y}, {"num",j} });
            if (polyline->segType(j) == AcDbPolyline::kArc) {
                polyline->getArcSegAt(j, arc);
                test = 1;
                coordsang.push_back({ {"startAngle", arc.startAng()}, {"endAngle",arc.endAng()}, {"num",j} });
            }
        }
        obj["className"] = "AcDbPolyline";
        obj["coords"] = coords;
        obj["closed"] = polyline->isClosed();
        if(test==1)
            obj["coordsang"] = coordsang;
        polyline->close();
    
}
void Json::getline(AcDbLine* line, AcDbObjectId id, json& obj)
{
        //acutPrintf(_T("ObjectID: %d"), id.asOldId());
        AcGePoint3d startpoint, endpoint;
        startpoint = line->startPoint();
        endpoint = line->endPoint();
        obj["className"] = "AcDbLine";
        JSON(obj, line);
        obj["coords"] = { {"x1", startpoint.x}, {"y1", startpoint.y}, {"z1", startpoint.z}, {"x2",endpoint.x},{"y2",endpoint.y},{"z2",endpoint.z} };
        obj["thickness"] = line->thickness();
        //acutPrintf(_T("%s"), as_wstring(obj.dump()).c_str());
        line->close();
   
}
void Json::get3dpolyline(AcDb3dPolyline* polyline3d, AcDbObjectId id, json& obj)
{
    json coords = json::array();  
    AcDbObjectIterator* Iterator = polyline3d->vertexIterator();
    AcDbObjectId Object;
    obj["className"] = "AcDb3dPolyline";
    JSON(obj, polyline3d);
    for (Iterator->start(); !Iterator->done(); Iterator->step()) {
        AcDb3dPolylineVertex* point;
        if (acdbOpenObject(point, Iterator->objectId(), AcDb::kForRead) == Acad::eOk) {
            AcGePoint3d p;
           p = point->position();
           coords.push_back({ { "x", p.x }, { "y", p.y }, { "z", p.z } });
           point->close();
        }
        else acutPrintf(_T("%d"), 2);

    }
    obj["type"] = polyline3d->polyType();
    obj["closed"] = polyline3d->isClosed();
    obj["coords"] = coords;
    delete Iterator;
    
}
void Json::getarc(AcDbArc* Arc, AcDbObjectId id, json& obj) 
{
    JSON(obj, Arc);
    AcGePoint3d center;
    center = Arc->center();
    obj["coordscenter"] = { {"x", center.x}, {"y", center.y}, {"z", center.z} };
    AcGeVector3d normal;
    normal = Arc->normal();
    obj["coordsnormal"] = { {"x", normal.x}, {"y", normal.y}, {"z", normal.z} };
    obj["coordsRadAng"] = { {"radius",Arc->radius()},{"endAngle",Arc->endAngle()},{"startAngle",Arc->startAngle()} };
    obj["className"] = "AcDbArc";
    Arc->close();
}
void Json::getCircle(AcDbCircle* Circle, AcDbObjectId id, json& obj)
{
    JSON(obj, Circle);
    AcGePoint3d center;
    center = Circle->center();
    obj["coordscenter"] = { {"x", center.x}, {"y", center.y}, {"z", center.z} };
    AcGeVector3d normal;
    normal = Circle->normal();
    obj["coordsnormal"] = { {"x", normal.x}, {"y", normal.y}, {"z", normal.z} };
    obj["coordsRad"] = { {"radius",Circle->radius()} };
    obj["className"] = "AcDbCircle";
    Circle->close();
}
void Json::getEllipse(AcDbEllipse* Ellipse, AcDbObjectId id, json& obj)
{
    JSON(obj, Ellipse);
    AcGePoint3d center;
    center = Ellipse->center();
    obj["coordscenter"] = { {"x", center.x}, {"y", center.y}, {"z", center.z} };
    AcGeVector3d normal, majorAxis;
    normal = Ellipse->normal();
    majorAxis = Ellipse->majorAxis();
    obj["coordsUnitNormal"] = { {"x", normal.x}, {"y", normal.y}, {"z", normal.z} };
    obj["coordsMajorAxis"] = { {"x", majorAxis.x}, {"y", majorAxis.y}, {"z", majorAxis.z} };
    obj["coordsRadAng"] = { {"radius",Ellipse->radiusRatio()},{"endAngle",Ellipse->endAngle()},{"startAngle",Ellipse->startAngle()} };
    obj["className"] = "AcDbEllipse";
    Ellipse->close();
}
void Json::assget(json& j)
{
    ads_name ssname;
    AcString layer;
    AcDbObjectId create = AcDbObjectId::kNull;
    if (acedSSGet(_T("A"), NULL, NULL, NULL, ssname) != StatusType::StatusRTNORM) {
        acutPrintf(_T("\nSelection failed"));
    }
    Adesk::Int32 length = 0;
    if ((acedSSLength(ssname, &length) != StatusType::StatusRTNORM) || (length == 0)) {
        acedSSFree(ssname);
        return;
    }
    AcDbPoint* point;
    AcDbPolyline* polyline;
    AcDbLine* line;
    AcDbArc* Arc;
    AcDbCircle* Circle;
    AcDb3dPolyline* polyline3d;
    AcDbEllipse* Ellipse;
    ads_name ent;
    AcDbObjectId id = AcDbObjectId::kNull;
    // Walk through the selection set and open each entity
    for (long i = 0; i < length; i++) {
        if (acedSSName(ssname, i, ent) != StatusType::StatusRTNORM) continue;
        if (acdbGetObjectId(id, ent) != Acad::eOk) continue;
        json obj;
        if (acdbOpenObject(point, id, AcDb::kForRead) == Acad::eOk) {
            getpoint(point, id, obj);
            j.push_back(obj);
            continue;
        }
        if (acdbOpenObject(line, id, AcDb::kForRead) == Acad::eOk) {
            getline(line, id, obj);
            j.push_back(obj);
            continue;
        }
        if (acdbOpenObject(polyline, id, AcDb::kForRead) == Acad::eOk) {
            getpolyline(polyline, id, obj);
            j.push_back(obj);
            continue;
        }
        if (acdbOpenObject(polyline3d, id, AcDb::kForRead) == Acad::eOk) {
            get3dpolyline(polyline3d, id, obj);
            j.push_back(obj);
            continue;
        }
        if (acdbOpenObject(Arc, id, AcDb::kForRead) == Acad::eOk) {
            getarc(Arc, id, obj);
            j.push_back(obj);
            continue;
        }
        if (acdbOpenObject(Circle, id, AcDb::kForRead) == Acad::eOk) {
            getCircle(Circle, id, obj);
            j.push_back(obj);
            continue;
        }
        if (acdbOpenObject(Ellipse, id, AcDb::kForRead) == Acad::eOk) {
            getEllipse(Ellipse, id, obj);
            j.push_back(obj);
            continue;
        }
    }
    //acutPrintf(_T("\n%s"), as_wstring(j.dump()).c_str());
    ofstream MyFile("C:\\Users\\sanng\\OneDrive - Hanoi University of Science and Technology\\Desktop\\Bandolovia-MongDuong.txt", ios::app);
    MyFile << j.dump();
    MyFile.close();
    acedSSFree(ssname);
}