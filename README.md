# Ví dụ về cách lấy dữ liệu từ api và hiển thị 

```js
//sử dụng fetch() hoặc axios để lấy dữ liệu từ API
//vì dữ liệu được lấy không thể có mặt ngay lập tức nên ta sử dụng hàm đồng bộ
async function main(){
  const res_1 = await axios.get("http://example.com/api/")
  var data = res_1.data
  //or
  const res_2 = fetch("http://example.com/api/")
  var data = res_2.json()
}
```