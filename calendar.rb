require 'sinatra'
require 'net/http'
require 'httparty'
require 'date'

# Make the API call for all the information
# Change all times from string to datetime object
get '/' do
  @agenda = HTTParty.get('http://fake-co-calendar.herokuapp.com/api/v1/events?offset=350')['events']['list']
  @agenda.each do |meeting|
    meeting['start_time'] = DateTime.strptime(meeting['start_time'] + Time.now.getlocal.zone, "%Y-%m-%d %H:%M:%S %z")
    meeting['end_time'] = DateTime.strptime(meeting['end_time'] + Time.now.getlocal.zone, "%Y-%m-%d %H:%M:%S %z")
  end
  erb :index
end
