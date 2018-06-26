
# Wireless-Throughput-Test
 UniFi SDN Recruitment assignment - automated throughput test in WiFi environment.
 #### Tools:
   * `iperf3` used for throughput measures
   * backend written in `python3`
   * `Flask` + `uWSGI` for serving HTTP
   * `MongoDB` used to collect results
   * frontend in `React`
## Test environment depiction
#### Client
ASUS N75SL:
  * CPU: Intel(R) Core(TM) i5-2450M CPU @ 2.50GHz
  * memory: SODIMM DDR3 Synchronous 1333 MHz (0,8 ns) 4GiB + 2GiB
  * motherboard: N75SL (ASUSTeK Computer Inc.)
  * network wireless interface: Centrino Wireless-N 1030 \[Rainbow Peak\]

In general: 6 years old laptop.

#### AP radio:
TP LINK TL-WR340G
  * mode: 802.11bg mixed
  * low transmit power set
  * default settings

## Optimization algorithm
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

## Installation and usage
To properly run the application you will need to get these packages installed:
  * `python3`
  * `python3-pip`
  * `pipenv`
  * `iperf3`: https://iperf.fr/iperf-download.php
  * `npm`: https://nodejs.org/en/ (node contains npm already)
  * `MongoDB`: https://docs.mongodb.com/manual/installation/

You can install `python3` with `python3-pip` on Debian/Ubuntu using:
```
apt-get install python3 python3-pip
```
Or on a Fedora/Redhat:
```
yum install python3 python3-pip
```
To install `pipenv`:
```
pip3 install pipenv
```
Make sure you also have PATH environment variable  properly set to run `npm` and `iperf3` from command line.

Also to build `uWSGI` you need python and C compiler with development headers. On a Debian/Ubuntu system you can install them (and the rest of the infrastructure required to build software) with:
```
apt-get install build-essential python3-dev
```

On a Fedora/Redhat you can install them with:
```
yum groupinstall "Development Tools"
yum install python3-devel
```

  
#### Building the application:
  1. Clone this repository: 
    `git clone https://github.com/n1ay/Wireless-Throughput-Test.git`
  2. Get into project main directory and run `build.sh` script:
    `cd Wireless-Throughput-Test`
    `./build.sh`
  3. It's done!

#### Before running
Application uses default settings `(localhost:27017)` to connect to the database. If you want to change database related settings, feel free to modify `Database/db_config.py` file.

#### Running the application
Application uses `MongoDB`, so make sure it is already running before running the application.
Run `run.sh` script from main project directory: `./run.sh`
Open `localhost:5000` in your browser to use the application.

## Results
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#### Comment on results
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
