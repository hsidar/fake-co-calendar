class CalendarController < ApplicationController

  require 'httparty'

  # make API call, loading the variable only with the meat I need

  def index
    @agenda = HTTParty.get('http://fake-co-calendar.herokuapp.com/api/v1/events?offset=-730')['events']['list']
    @agenda.each do |meeting|
      meeting['start_time'] = DateTime.strptime(meeting['start_time'] + Time.now.getlocal.zone, "%Y-%m-%d %H:%M:%S %z")
      meeting['end_time'] = DateTime.strptime(meeting['end_time'] + Time.now.getlocal.zone, "%Y-%m-%d %H:%M:%S %z")
    end
  end
end
