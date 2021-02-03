# BookingFrontend

Frontend for Facility Booking assignment.

[Link to Docker Image](https://hub.docker.com/repository/docker/qingzz/bookingfrontend)

This docker image will requires BookingBackend to be running.

Example 


```sh
sudo docker pull qingzz/bookingfrontend:latest
sudo docker run --name facilityBookingFrontend -p 80:3000 -e REACT_APP_BACKEND_HOST=<BookingBackend_IP> -e REACT_APP_BACKEND_PORT=<BookingBackend_Port> -d qingzz/bookingfrontend:latest
```

Default value for environment variables
BookingBackend_IP = localhost
BookingBackend_IP = 8000