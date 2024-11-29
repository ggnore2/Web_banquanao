  // Lấy dữ liệu tỉnh/quận/xã từ JSON và hiển thị trong các ô chọn
  axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
  .then(function(response) {
      const data = response.data;
      const citySelect = document.getElementById("city");
      const districtSelect = document.getElementById("district");
      const wardSelect = document.getElementById("ward");

      // Hiển thị danh sách tỉnh/thành phố
      data.forEach(city => {
          const option = document.createElement('option');
          option.value = city.Id;
          option.textContent = city.Name;
          citySelect.appendChild(option);
      });

      // Khi chọn tỉnh/thành phố
      citySelect.addEventListener("change", function() {
          districtSelect.innerHTML = '<option value="">Chọn quận huyện</option>';
          wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';
          if (this.value) {
              const selectedCity = data.find(city => city.Id === this.value);
              selectedCity.Districts.forEach(district => {
                  const option = document.createElement('option');
                  option.value = district.Id;
                  option.textContent = district.Name;
                  districtSelect.appendChild(option);
              });
          }
      });

      // Khi chọn quận/huyện
      districtSelect.addEventListener("change", function() {
          wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';
          if (this.value) {
              const selectedCity = data.find(city => city.Id === citySelect.value);
              const selectedDistrict = selectedCity.Districts.find(district => district.Id === this.value);
              selectedDistrict.Wards.forEach(ward => {
                  const option = document.createElement('option');
                  option.value = ward.Id;
                  option.textContent = ward.Name;
                  wardSelect.appendChild(option);
              });
          }
      });
  })
  .catch(function(error) {
      console.error("Lỗi khi tải dữ liệu địa lý:", error);
  });
