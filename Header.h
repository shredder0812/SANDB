

using namespace std;
using json = nlohmann::json;


class Json
{
public:
    wstring as_wstring(string s);
    string as_string(wstring s);
    void JSON(json& s, AcDbEntity* e);
    void getpoint(AcDbPoint* point, AcDbObjectId id, json& obj);
    void getline(AcDbLine* line, AcDbObjectId id, json& obj);
    void getpolyline(AcDbPolyline* polyline, AcDbObjectId id, json& obj);
    void get3dpolyline(AcDb3dPolyline* polyline3d, AcDbObjectId id, json& obj);
    void getarc(AcDbArc* Arc, AcDbObjectId id, json& obj);
    void getCircle(AcDbCircle* Circle, AcDbObjectId id, json& obj);
    void getEllipse(AcDbEllipse* Ellipse, AcDbObjectId id, json& obj);
    void assget(json& j);

};
