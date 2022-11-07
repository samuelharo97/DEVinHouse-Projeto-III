---
title: LabCar v1.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2
---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="labcar">LabCar v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

The LabCar API

Base URLs:

<h1 id="labcar-drivers">drivers</h1>

## DriversController_create

<a id="opIdDriversController_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /drivers \
  -H 'Content-Type: application/json'

```

```http
POST /drivers HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "birth_date": "yyyy-mm-dd",
  "cpf": "string",
  "car_plate": "MZW4550, MYF8104, IAO4372, ADC9313",
  "car_model": 0,
  "location": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/drivers',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/drivers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/drivers', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/drivers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/drivers");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/drivers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /drivers`

_Creates a new Driver_

> Body parameter

```json
{
  "name": "string",
  "birth_date": "yyyy-mm-dd",
  "cpf": "string",
  "car_plate": "MZW4550, MYF8104, IAO4372, ADC9313",
  "car_model": 0,
  "location": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}
```

<h3 id="driverscontroller_create-parameters">Parameters</h3>

| Name | In   | Type                                      | Required | Description |
| ---- | ---- | ----------------------------------------- | -------- | ----------- |
| body | body | [CreateDriverDto](#schemacreatedriverdto) | true     | none        |

<h3 id="driverscontroller_create-responses">Responses</h3>

| Status | Meaning                                                      | Description | Schema |
| ------ | ------------------------------------------------------------ | ----------- | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## DriversController_findAll

<a id="opIdDriversController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /drivers?name=string

```

```http
GET /drivers?name=string HTTP/1.1

```

```javascript
fetch('/drivers?name=string', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/drivers',
  params: {
  'name' => 'string'
}

p JSON.parse(result)

```

```python
import requests

r = requests.get('/drivers', params={
  'name': 'string'
})

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/drivers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/drivers?name=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/drivers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /drivers`

_Lists all drivers, with optional pagination and name query_

<h3 id="driverscontroller_findall-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description |
| ---- | ----- | ------ | -------- | ----------- |
| name | query | string | true     | none        |

<h3 id="driverscontroller_findall-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## DriversController_findOne

<a id="opIdDriversController_findOne"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /drivers/{cpf}

```

```http
GET /drivers/{cpf} HTTP/1.1

```

```javascript
fetch('/drivers/{cpf}', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/drivers/{cpf}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/drivers/{cpf}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/drivers/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/drivers/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/drivers/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /drivers/{cpf}`

_Lists driver details_

<h3 id="driverscontroller_findone-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| cpf  | path | string | true     | none        |

<h3 id="driverscontroller_findone-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## DriversController_update

<a id="opIdDriversController_update"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT /drivers/{cpf} \
  -H 'Content-Type: application/json'

```

```http
PUT /drivers/{cpf} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type': 'application/json',
};

fetch('/drivers/{cpf}', {
  method: 'PUT',
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put '/drivers/{cpf}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('/drivers/{cpf}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','/drivers/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/drivers/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/drivers/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /drivers/{cpf}`

_Updates driver_

> Body parameter

```json
{}
```

<h3 id="driverscontroller_update-parameters">Parameters</h3>

| Name | In   | Type                                      | Required | Description |
| ---- | ---- | ----------------------------------------- | -------- | ----------- |
| cpf  | path | string                                    | true     | none        |
| body | body | [UpdateDriverDto](#schemaupdatedriverdto) | true     | none        |

<h3 id="driverscontroller_update-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## DriversController_remove

<a id="opIdDriversController_remove"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /drivers/{cpf}

```

```http
DELETE /drivers/{cpf} HTTP/1.1

```

```javascript
fetch('/drivers/{cpf}', {
  method: 'DELETE',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete '/drivers/{cpf}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('/drivers/{cpf}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/drivers/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/drivers/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/drivers/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /drivers/{cpf}`

_Deletes a driver, if he is inactive (0 trips taken)_

<h3 id="driverscontroller_remove-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| cpf  | path | string | true     | none        |

<h3 id="driverscontroller_remove-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## DriversController_block

<a id="opIdDriversController_block"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH /drivers/block/{cpf} \
  -H 'Content-Type: application/json'

```

```http
PATCH /drivers/block/{cpf} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "blocked": true
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/drivers/block/{cpf}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.patch '/drivers/block/{cpf}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.patch('/drivers/block/{cpf}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','/drivers/block/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/drivers/block/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/drivers/block/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /drivers/block/{cpf}`

_Changes driver.blocked to true of false_

> Body parameter

```json
{
  "blocked": true
}
```

<h3 id="driverscontroller_block-parameters">Parameters</h3>

| Name | In   | Type                                    | Required | Description |
| ---- | ---- | --------------------------------------- | -------- | ----------- |
| cpf  | path | string                                  | true     | none        |
| body | body | [BlockDriverDTO](#schemablockdriverdto) | true     | none        |

<h3 id="driverscontroller_block-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="labcar-trips">trips</h1>

## TripsController_create

<a id="opIdTripsController_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /trips/new/{passengerCPF} \
  -H 'Content-Type: application/json'

```

```http
POST /trips/new/{passengerCPF} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "starting_from": {
    "state": "string",
    "city": "string",
    "street": "string"
  },
  "final_destination": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/trips/new/{passengerCPF}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/trips/new/{passengerCPF}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/trips/new/{passengerCPF}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/trips/new/{passengerCPF}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips/new/{passengerCPF}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/trips/new/{passengerCPF}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /trips/new/{passengerCPF}`

_Creates new trip_

> Body parameter

```json
{
  "starting_from": {
    "state": "string",
    "city": "string",
    "street": "string"
  },
  "final_destination": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}
```

<h3 id="tripscontroller_create-parameters">Parameters</h3>

| Name         | In   | Type                                  | Required | Description |
| ------------ | ---- | ------------------------------------- | -------- | ----------- |
| passengerCPF | path | string                                | true     | none        |
| body         | body | [CreateTripDto](#schemacreatetripdto) | true     | none        |

<h3 id="tripscontroller_create-responses">Responses</h3>

| Status | Meaning                                                      | Description | Schema |
| ------ | ------------------------------------------------------------ | ----------- | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## TripsController_findNearby

<a id="opIdTripsController_findNearby"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /trips/nearby/{driverCPF} \
  -H 'Content-Type: application/json'

```

```http
POST /trips/nearby/{driverCPF} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "location": "{\n      \"state\": \"RJ\",\n      \"city\": \"Rio de Janeiro\",\n      \"street\": \"Copacabana\"\n    }"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/trips/nearby/{driverCPF}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/trips/nearby/{driverCPF}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/trips/nearby/{driverCPF}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/trips/nearby/{driverCPF}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips/nearby/{driverCPF}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/trips/nearby/{driverCPF}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /trips/nearby/{driverCPF}`

_Lists trips nearby driver_

If post body has driver.location, this route will list trips 15km around the location's coordinates, but, this request can also be made with NO BODY, then, driver.location will be taken from the drivers default location (the location registered when driver was created).

> Body parameter

```json
{
  "location": "{\n      \"state\": \"RJ\",\n      \"city\": \"Rio de Janeiro\",\n      \"street\": \"Copacabana\"\n    }"
}
```

<h3 id="tripscontroller_findnearby-parameters">Parameters</h3>

| Name      | In   | Type                                          | Required | Description |
| --------- | ---- | --------------------------------------------- | -------- | ----------- |
| driverCPF | path | string                                        | true     | none        |
| body      | body | [DriverLocationDto](#schemadriverlocationdto) | true     | none        |

<h3 id="tripscontroller_findnearby-responses">Responses</h3>

| Status | Meaning                                                      | Description | Schema |
| ------ | ------------------------------------------------------------ | ----------- | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## TripsController_findAll

<a id="opIdTripsController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /trips

```

```http
GET /trips HTTP/1.1

```

```javascript
fetch('/trips', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/trips',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/trips')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/trips', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/trips", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /trips`

_Lists all trips_

<h3 id="tripscontroller_findall-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## TripsController_findPending

<a id="opIdTripsController_findPending"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /trips/pending

```

```http
GET /trips/pending HTTP/1.1

```

```javascript
fetch('/trips/pending', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/trips/pending',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/trips/pending')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/trips/pending', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips/pending");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/trips/pending", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /trips/pending`

_Lists all trips with status = created_

<h3 id="tripscontroller_findpending-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## TripsController_findOne

<a id="opIdTripsController_findOne"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /trips/{id}

```

```http
GET /trips/{id} HTTP/1.1

```

```javascript
fetch('/trips/{id}', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/trips/{id}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/trips/{id}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/trips/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/trips/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /trips/{id}`

_Lists trip details_

<h3 id="tripscontroller_findone-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| id   | path | string | true     | none        |

<h3 id="tripscontroller_findone-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## TripsController_update

<a id="opIdTripsController_update"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT /trips/{id} \
  -H 'Content-Type: application/json'

```

```http
PUT /trips/{id} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type': 'application/json',
};

fetch('/trips/{id}', {
  method: 'PUT',
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put '/trips/{id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('/trips/{id}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','/trips/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/trips/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /trips/{id}`

_Updates a trip_

> Body parameter

```json
{}
```

<h3 id="tripscontroller_update-parameters">Parameters</h3>

| Name | In   | Type                                  | Required | Description |
| ---- | ---- | ------------------------------------- | -------- | ----------- |
| id   | path | string                                | true     | none        |
| body | body | [UpdateTripDto](#schemaupdatetripdto) | true     | none        |

<h3 id="tripscontroller_update-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## TripsController_remove

<a id="opIdTripsController_remove"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /trips/{id}

```

```http
DELETE /trips/{id} HTTP/1.1

```

```javascript
fetch('/trips/{id}', {
  method: 'DELETE',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete '/trips/{id}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('/trips/{id}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/trips/{id}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/trips/{id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/trips/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /trips/{id}`

_Deletes a trip_

<h3 id="tripscontroller_remove-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| id   | path | string | true     | none        |

<h3 id="tripscontroller_remove-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="labcar-passengers">passengers</h1>

## PassengerController_create

<a id="opIdPassengerController_create"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /passengers \
  -H 'Content-Type: application/json'

```

```http
POST /passengers HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "birth_date": "2019-08-24T14:15:22Z",
  "cpf": "string",
  "address": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/passengers',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post '/passengers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('/passengers', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/passengers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/passengers");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/passengers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /passengers`

_Creates a new Passenger_

> Body parameter

```json
{
  "name": "string",
  "birth_date": "2019-08-24T14:15:22Z",
  "cpf": "string",
  "address": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}
```

<h3 id="passengercontroller_create-parameters">Parameters</h3>

| Name | In   | Type                                            | Required | Description |
| ---- | ---- | ----------------------------------------------- | -------- | ----------- |
| body | body | [CreatePassengerDto](#schemacreatepassengerdto) | true     | none        |

<h3 id="passengercontroller_create-responses">Responses</h3>

| Status | Meaning                                                      | Description | Schema |
| ------ | ------------------------------------------------------------ | ----------- | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## PassengerController_findAll

<a id="opIdPassengerController_findAll"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /passengers?name=string

```

```http
GET /passengers?name=string HTTP/1.1

```

```javascript
fetch('/passengers?name=string', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/passengers',
  params: {
  'name' => 'string'
}

p JSON.parse(result)

```

```python
import requests

r = requests.get('/passengers', params={
  'name': 'string'
})

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/passengers', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/passengers?name=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/passengers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /passengers`

_Lists all passengers, with optional pagination and name query_

<h3 id="passengercontroller_findall-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description |
| ---- | ----- | ------ | -------- | ----------- |
| name | query | string | true     | none        |

<h3 id="passengercontroller_findall-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## PassengerController_findOne

<a id="opIdPassengerController_findOne"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /passengers/{cpf}

```

```http
GET /passengers/{cpf} HTTP/1.1

```

```javascript
fetch('/passengers/{cpf}', {
  method: 'GET',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get '/passengers/{cpf}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('/passengers/{cpf}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/passengers/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/passengers/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/passengers/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /passengers/{cpf}`

_Lists passenger details_

<h3 id="passengercontroller_findone-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| cpf  | path | string | true     | none        |

<h3 id="passengercontroller_findone-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## PassengerController_update

<a id="opIdPassengerController_update"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT /passengers/{cpf} \
  -H 'Content-Type: application/json'

```

```http
PUT /passengers/{cpf} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type': 'application/json',
};

fetch('/passengers/{cpf}', {
  method: 'PUT',
  body: inputBody,
  headers: headers,
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put '/passengers/{cpf}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('/passengers/{cpf}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','/passengers/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/passengers/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/passengers/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /passengers/{cpf}`

_Updates passenger_

> Body parameter

```json
{}
```

<h3 id="passengercontroller_update-parameters">Parameters</h3>

| Name | In   | Type                                            | Required | Description |
| ---- | ---- | ----------------------------------------------- | -------- | ----------- |
| cpf  | path | string                                          | true     | none        |
| body | body | [UpdatePassengerDto](#schemaupdatepassengerdto) | true     | none        |

<h3 id="passengercontroller_update-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## PassengerController_remove

<a id="opIdPassengerController_remove"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /passengers/{cpf}

```

```http
DELETE /passengers/{cpf} HTTP/1.1

```

```javascript
fetch('/passengers/{cpf}', {
  method: 'DELETE',
})
  .then(function (res) {
    return res.json();
  })
  .then(function (body) {
    console.log(body);
  });
```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete '/passengers/{cpf}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('/passengers/{cpf}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/passengers/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/passengers/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/passengers/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /passengers/{cpf}`

_Deletes a passenger_

<h3 id="passengercontroller_remove-parameters">Parameters</h3>

| Name | In   | Type   | Required | Description |
| ---- | ---- | ------ | -------- | ----------- |
| cpf  | path | string | true     | none        |

<h3 id="passengercontroller_remove-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

## PassengerController_block

<a id="opIdPassengerController_block"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH /passengers/block/{cpf} \
  -H 'Content-Type: application/json'

```

```http
PATCH /passengers/block/{cpf} HTTP/1.1

Content-Type: application/json

```

```javascript
const inputBody = '{
  "blocked": true
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('/passengers/block/{cpf}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.patch '/passengers/block/{cpf}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.patch('/passengers/block/{cpf}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','/passengers/block/{cpf}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/passengers/block/{cpf}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/passengers/block/{cpf}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /passengers/block/{cpf}`

_Changes passenger.blocked to true of false_

> Body parameter

```json
{
  "blocked": true
}
```

<h3 id="passengercontroller_block-parameters">Parameters</h3>

| Name | In   | Type                                          | Required | Description |
| ---- | ---- | --------------------------------------------- | -------- | ----------- |
| cpf  | path | string                                        | true     | none        |
| body | body | [BlockPassengerDTO](#schemablockpassengerdto) | true     | none        |

<h3 id="passengercontroller_block-responses">Responses</h3>

| Status | Meaning                                                 | Description | Schema |
| ------ | ------------------------------------------------------- | ----------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | None   |

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Address">Address</h2>
<!-- backwards compatibility -->
<a id="schemaaddress"></a>
<a id="schema_Address"></a>
<a id="tocSaddress"></a>
<a id="tocsaddress"></a>

```json
{
  "state": "string",
  "city": "string",
  "street": "string"
}
```

### Properties

| Name   | Type   | Required | Restrictions | Description |
| ------ | ------ | -------- | ------------ | ----------- |
| state  | string | true     | none         | none        |
| city   | string | true     | none         | none        |
| street | string | true     | none         | none        |

<h2 id="tocS_CreatePassengerDto">CreatePassengerDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatepassengerdto"></a>
<a id="schema_CreatePassengerDto"></a>
<a id="tocScreatepassengerdto"></a>
<a id="tocscreatepassengerdto"></a>

```json
{
  "name": "string",
  "birth_date": "2019-08-24T14:15:22Z",
  "cpf": "string",
  "address": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}
```

### Properties

| Name       | Type                      | Required | Restrictions | Description |
| ---------- | ------------------------- | -------- | ------------ | ----------- |
| name       | string                    | true     | none         | none        |
| birth_date | string(date-time)         | true     | none         | none        |
| cpf        | string                    | true     | none         | none        |
| address    | [Address](#schemaaddress) | true     | none         | none        |

<h2 id="tocS_UpdatePassengerDto">UpdatePassengerDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatepassengerdto"></a>
<a id="schema_UpdatePassengerDto"></a>
<a id="tocSupdatepassengerdto"></a>
<a id="tocsupdatepassengerdto"></a>

```json
{}
```

### Properties

_None_

<h2 id="tocS_BlockPassengerDTO">BlockPassengerDTO</h2>
<!-- backwards compatibility -->
<a id="schemablockpassengerdto"></a>
<a id="schema_BlockPassengerDTO"></a>
<a id="tocSblockpassengerdto"></a>
<a id="tocsblockpassengerdto"></a>

```json
{
  "blocked": true
}
```

### Properties

| Name    | Type    | Required | Restrictions | Description |
| ------- | ------- | -------- | ------------ | ----------- |
| blocked | boolean | true     | none         | none        |

<h2 id="tocS_CreateDriverDto">CreateDriverDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatedriverdto"></a>
<a id="schema_CreateDriverDto"></a>
<a id="tocScreatedriverdto"></a>
<a id="tocscreatedriverdto"></a>

```json
{
  "name": "string",
  "birth_date": "yyyy-mm-dd",
  "cpf": "string",
  "car_plate": "MZW4550, MYF8104, IAO4372, ADC9313",
  "car_model": 0,
  "location": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}
```

### Properties

| Name       | Type                      | Required | Restrictions | Description                         |
| ---------- | ------------------------- | -------- | ------------ | ----------------------------------- |
| name       | string                    | true     | none         | none                                |
| birth_date | string(date-time)         | true     | none         | ISO 8601                            |
| cpf        | string                    | true     | none         | none                                |
| car_plate  | string                    | true     | none         | valid car plate with no hyphens (-) |
| car_model  | number                    | true     | none         | none                                |
| location   | [Address](#schemaaddress) | true     | none         | none                                |

<h2 id="tocS_UpdateDriverDto">UpdateDriverDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatedriverdto"></a>
<a id="schema_UpdateDriverDto"></a>
<a id="tocSupdatedriverdto"></a>
<a id="tocsupdatedriverdto"></a>

```json
{}
```

### Properties

_None_

<h2 id="tocS_BlockDriverDTO">BlockDriverDTO</h2>
<!-- backwards compatibility -->
<a id="schemablockdriverdto"></a>
<a id="schema_BlockDriverDTO"></a>
<a id="tocSblockdriverdto"></a>
<a id="tocsblockdriverdto"></a>

```json
{
  "blocked": true
}
```

### Properties

| Name    | Type    | Required | Restrictions | Description |
| ------- | ------- | -------- | ------------ | ----------- |
| blocked | boolean | true     | none         | none        |

<h2 id="tocS_CreateTripDto">CreateTripDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatetripdto"></a>
<a id="schema_CreateTripDto"></a>
<a id="tocScreatetripdto"></a>
<a id="tocscreatetripdto"></a>

```json
{
  "starting_from": {
    "state": "string",
    "city": "string",
    "street": "string"
  },
  "final_destination": {
    "state": "string",
    "city": "string",
    "street": "string"
  }
}
```

### Properties

| Name              | Type                      | Required | Restrictions | Description |
| ----------------- | ------------------------- | -------- | ------------ | ----------- |
| starting_from     | [Address](#schemaaddress) | true     | none         | none        |
| final_destination | [Address](#schemaaddress) | true     | none         | none        |

<h2 id="tocS_DriverLocationDto">DriverLocationDto</h2>
<!-- backwards compatibility -->
<a id="schemadriverlocationdto"></a>
<a id="schema_DriverLocationDto"></a>
<a id="tocSdriverlocationdto"></a>
<a id="tocsdriverlocationdto"></a>

```json
{
  "location": "{\n      \"state\": \"RJ\",\n      \"city\": \"Rio de Janeiro\",\n      \"street\": \"Copacabana\"\n    }"
}
```

### Properties

| Name     | Type                      | Required | Restrictions | Description                                                              |
| -------- | ------------------------- | -------- | ------------ | ------------------------------------------------------------------------ |
| location | [Address](#schemaaddress) | true     | none         | OPTIONAL, if undefined, the default driver location will be used instead |

<h2 id="tocS_UpdateTripDto">UpdateTripDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatetripdto"></a>
<a id="schema_UpdateTripDto"></a>
<a id="tocSupdatetripdto"></a>
<a id="tocsupdatetripdto"></a>

```json
{}
```

### Properties

_None_
