#include <iostream>
#include <string>
#include <curl/curl.h>

using namespace std;

int main() {
  // Tạo đối tượng CURL
  CURL *curl = curl_easy_init();

  // Thiết lập URL của API
  curl_easy_setopt(curl, CURLOPT_URL, "https://localhost:3000/jsondata");

  // Thiết lập phương thức GET
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "GET");

  // Thiết lập biến để lưu trữ kết quả trả về của API
  string response;
  
  // Thực hiện truy vấn API
  curl_easy_perform(curl);

  // Lấy kết quả trả về của API
  curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &response_code);
  curl_easy_getinfo(curl, CURLINFO_RESPONSE_CONTENT_LENGTH_DOWNLOAD, &response_content_length);

  // In ra kết quả trả về của API
  cout << "Response code: " << response_code << endl;
  cout << "Response content length: " << response_content_length << endl;

  // Giải mã kết quả trả về của API thành JSON
  nlohmann::json json_response = nlohmann::json::parse(response);

  // In ra các giá trị trong kết quả trả về của API
  for (auto element : json_response) {
    cout << element << endl;
  }

  // Giải phóng tài nguyên
  curl_easy_cleanup(curl);

  return 0;
}


string s_[tên đối tượng] = response;

cout<<response << endl;