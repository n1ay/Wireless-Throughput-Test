

# Wireless-Throughput-Test
 UniFi SDN Recruitment assignment - automated throughput test in WiFi environment.
 #### Tools:
   * `iperf3` used for throughput measure
   * `Flask` + `uWSGI` for serving HTTP
   * `MongoDB` used to collect results
   * `React` for front-end
   * `python3` for back-end
## Test environment depiction
#### Client
ASUS N75SL:
  * CPU: Intel(R) Core(TM) i5-2450M CPU @ 2.50GHz 
  * 6GiB RAM
  * network wireless interface: Centrino Wireless-N 1030 \[Rainbow Peak\]

In general: 6 years old laptop.

#### AP radio:
TP LINK TL-WR340G
  * mode: 802.11bg mixed
  * low transmit power set
  * default settings

## Optimization algorithm
Not classical, but actually a hybrid of a few classical algorithms. It is greedy algorithm which performs search through full domain of one parameter first and other parameters are unchanged. After first loop it calculates mean of the results and excludes parameter values which gave results worse than mean. The process is repeated for every parameter. After that, next iteration starts which is the same as initial one, but already some parameters values are pruned. Algorithm stops after certain number of iterations which can be set by user.

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

You can change optimization algorithm parameters in `WirelessThroughputTest/config.py`.

#### Running the application
Application uses `MongoDB`, so make sure it is already running before running the application.
Run `run.sh` script from main project directory: `./run.sh`  
Open `localhost:5000` in your browser to use the application.

## Results
Test was executed in closed environment, without connection to the Internet. `iperf3` parameters used:
  * `-l` buffer length
  * `-w` window size
  * `-M` maximum segment size
with `-t 6` (six seconds per single measurement)

For TCP client -> server transmission best result was:
20.1 Mbits/s with parameters:
  * buffer length: 2K
  * window size: 256K
  * maximum segment size: 3500
---
For TCP server -> client transmission best result was:
23.3 Mbits/s with parameters:
  * buffer length: 1M
  * window size: 32K
  * maximum segment size: 2264

#### Comment on results
About server -> client transmission(graph below):
First of all, all the results I've got are very similar. After first few iterations of the algorithm almost all results were almost all the same. Different between max and min is less than 10%. The best value was result with mss of 802.11 standard.
![server -> client transmission](https://n1ay.github.io/sc.png)

---
In comparison to the first one, client -> server transmission (graph below) was actually a lot more chaotic. Throughput seems a little random. For exactly the same parameters two measurements differ up to 30%. Comparing both results, server -> client transmission had little window size and large buffer length, while client -> server transmission was completely opposite.

![server -> client transmission](https://n1ay.github.io/cs.png)

The results are not truly best configurations, but definitely they are not bad. It just somehow happened that throughput was really good at that time and it was measured. Things like that happens when we fiddle with networking, especially using such low quality hardware.
