# Wireless-Throughput-Test
 UniFi SDN Recruitment assignment - automated throughput test in WiFi environment.
 #### Tools:
   * `iperf3` used for throughput measures
   * backend written in `python3` - `Flask` for serving HTTP
   * `MongoDB` used to collect results
   * frontend in `React`
## Test environment depiction
#### Client
ASUS N75SL:
  * CPU: Intel(R) Core(TM) i5-2450M CPU @ 2.50GHz
  * memory: SODIMM DDR3 Synchronous 1333 MHz (0,8 ns) 4GiB + 2GiB
  * motherboard: N75SL (ASUSTeK Computer Inc.)
  * network wireless interface: Centrino Wireless-N 1030 \[Rainbow Peak\]

In general: 6 years old laptop. Video card dead since 2016.

#### AP radio:
TP LINK TL-WR340G
  * mode: 802.11bg mixed
  * low transmit power set
  * default settings

## Installation and usage
I'm assuming you've already got these packages installed:
  * `python3`
  * `python3-pip`
  * `iperf3`
  * `npm`
  * `MongoDB`
  
#### Installation:
  1. Clone this repository: 
    `git clone https://github.com/n1ay/Wireless-Throughput-Test.git`
  2. Run `build.sh` script from project main directory:
    `cd Wireless-Throughput-Test`
    `./build.sh`
    It will ask about your password, since it need to download packages and set up environment
  3. It's done!

#### Before running
Application uses default settings `(localhost:27017)` to connect to the database. If you want to modify it, settings can be set in file `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.

#### Running the application
Application uses `MongoDB`, so make sure it is already running before running the application.
Run `run.sh` script from main project directory:
`./run.sh`
Open `localhost:5000` in your browser to use the application.

## Results
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#### Comment on results
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
