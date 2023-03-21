const BASE_URL = 'https://api.openrouteservice.org/v2/directions';

class RouteService {
  async getRoutes(
    start: {
      latitude: number;
      longitude: number;
    },
    end: {
      latitude: number;
      longitude: number;
    },
    onSuccess: (res: any) => void,
  ) {
    let request = new XMLHttpRequest();

    request.open('POST', BASE_URL + '/driving-car');

    request.setRequestHeader(
      'Accept',
      'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    );
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader(
      'Authorization',
      '5b3ce3597851110001cf62485f345818dacd4cbda0b365c7c86fb074',
    );

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        onSuccess(JSON.parse(this.responseText));
      }
    };

    const body = `{"coordinates":[[${start.longitude},${start.latitude}],[${end.longitude},${end.latitude}]],"preference":"fastest"}`;

    request.send(body);
  }
}

export default new RouteService();