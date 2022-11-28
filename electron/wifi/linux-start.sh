# nmcli connection delete "AdHoc"
echo 'The current logged-in User is:' $SSID
# nmcli dev wifi hotspot ifname wlp3s0 ssid $SSID password "$PASSWORD"
# nmcli dev wifi hotspot
nmcli con add type wifi ifname "wlp3s0" con-name AdHoc ssid $SSID
nmcli con modify "AdHoc" 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
nmcli con modify "AdHoc" wifi-sec.key-mgmt ieee8021x
nmcli con modify "AdHoc" wifi-sec.psk "$PASSWORD"
nmcli con up "AdHoc"