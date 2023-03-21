const BASE_URL = 'https://www.nosyapi.com/apiv2';

class HospitalService {
  async getHospitals(
    city: string,
    district: string,
    onSuccess: (res: any) => void,
  ) {
    var data = new FormData();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        onSuccess(this.responseText);
      }
    });

    xhr.open(
      'GET',
      BASE_URL + `/hospital?city=${city.toLowerCase()}&county=${district}`,
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer VpSyeow88wCnrtFHtbl9wi0fTY0Y9lQ89nh8dSiy4uXpTF7i8OkTkLO785Rv',
    );

    xhr.send(data);
  }
}

export default new HospitalService();