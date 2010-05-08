# use rackup to start a server that will server static files
run Rack::File.new('.')