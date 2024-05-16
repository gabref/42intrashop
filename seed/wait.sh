#!/bin/sh

# wait-for-it.sh

host="$1"

shift

port="$1"
shift
cmd="$@"

# Timeout in seconds
timeout=60

# Start time
start_time=$(date +%s)

# while ! nc -z $host $port; do   
#   current_time=$(date +%s)
#   elapsed_time=$((current_time - start_time))
#   if [ $elapsed_time -ge $timeout ]; then
#     >&2 echo "Timeout reached: $host:$port is still not available after $timeout seconds."
#     exit 1
#   fi
#   >&2 echo "Waiting for $host:$port to be available..."
#   sleep 1
# done

# Check for service availability
# until curl --output /dev/null --silent --head --fail "$host:$port"; do
#   current_time=$(date +%s)
#   elapsed_time=$((current_time - start_time))
#   if [ $elapsed_time -ge $timeout ]; then
#     >&2 echo "Timeout reached: $host:$port is still not available after $timeout seconds."
#     exit 1
#   fi
#   >&2 echo "Waiting for $host:$port to be available..."
#   sleep 1
# done

sleep 5

>&2 echo "$host:$port is available - executing command"
exec $cmd
