#!/bin/bash
mkdir -p /home/sneha/three-tier-app/logs
while true
do
	    TS=$(date +%Y%m%d_%H%M)
	    
            docker compose logs > /home/sneha/three-tier-app/logs/compose_$TS.log
		
            sleep 300
done
