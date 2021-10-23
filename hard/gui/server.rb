require 'sinatra'
require 'sinatra/reloader'
require 'json'

get "/" do
  erb :index
end

get "/api/parameter/list" do
  parameters = {}
  # parameters["a"] = 0.0
  parameters["b"] = -0.1
  parameters["c"] = -0.42
  # parameters["d"] = 0.0
  parameters["e"] = 0.8
  parameters["f"] = 0.5
  parameters["Omega"] = 0.0
  parameters["blob.high"] = 1
  parameters["blob.low"] = 0.5
  parameters["blob.waves"] = 5
  parameters["pdj.a"] = 0.7
  parameters["pdj.b"] = 0.3
  parameters["pdj.c"] = 0.6
  parameters["pdj.d"] = 0.1
  parameters["fan2.x"] = 0.8
  parameters["fan2.y"] = 1.0
  parameters["rings2.val"] = 0.5
  parameters["perspective.angle"] = 0.5
  parameters["perspective.dist"] = 2
  parameters["juliaN.power"] = 2
  parameters["juliaN.dist"] = 2
  parameters["juliaScope.power"] = 2
  parameters["juliaScope.dist"] = 2
  parameters["v36"] = 1.5
  parameters["radialBlur.angle"] = 1.2
  parameters["pie.slices"] = 5
  parameters["pie.rotation"] = 0.2
  parameters["pie.thickness"] = 0.2
  parameters["ngon.power"] = 2
  parameters["ngon.sides"] = 0.3
  parameters["ngon.corners"] = 0.3
  parameters["ngon.circle"] = 0.4
  parameters["curl.c1"] = 0.4
  parameters["curl.c2"] = 0.6
  parameters["rectangles.x"] = 0.8
  parameters["rectangles.y"] = 0.4
  parameters["v41"] = 1.0
  parameters["v44"] = 3.0
  parameters["v45"] = 2.0
  parameters["v46"] = 2.0
  parameters["v47"] = 2.0

  parameters.map do |k, v|
    {
      "name": k,
      "value": v
    }
  end.to_json
end

get "/api/parameter/index" do
  parameters = {}
  # parameters["a"] = []
  parameters["b"] = [15]
  parameters["c"] = [15, 17, 21, 22]
  # parameters["d"] = []
  parameters["e"] = [15]
  parameters["f"] = [15, 17, 22]
  parameters["Omega"] = [13]
  parameters["blob.high"] = [23]
  parameters["blob.low"] = [23]
  parameters["blob.waves"] = [23]
  parameters["pdj.a"] = [24]
  parameters["pdj.b"] = [24]
  parameters["pdj.c"] = [24]
  parameters["pdj.d"] = [24]
  parameters["fan2.x"] = [25]
  parameters["fan2.y"] = [25]
  parameters["rings2.val"] = [26]
  parameters["perspective.angle"] = [30]
  parameters["perspective.dist"] = [30]
  parameters["juliaN.power"] = [32]
  parameters["juliaN.dist"] = [32]
  parameters["juliaScope.power"] = [33]
  parameters["juliaScope.dist"] = [33]
  parameters["v36"] = [36]
  parameters["radialBlur.angle"] = [36]
  parameters["pie.slices"] = [37]
  parameters["pie.rotation"] = [37]
  parameters["pie.thickness"] = [37]
  parameters["ngon.power"] = [38]
  parameters["ngon.sides"] = [38]
  parameters["ngon.corners"] = [38]
  parameters["ngon.circle"] = [38]
  parameters["curl.c1"] = [39]
  parameters["curl.c2"] = [39]
  parameters["rectangles.x"] = [40]
  parameters["rectangles.y"] = [40]
  parameters["v41"] = [41]
  parameters["v44"] = [44]
  parameters["v45"] = [45]
  parameters["v46"] = [46]
  parameters["v47"] = [47]

  parameters.map do |k, v|
    {
      "name": k,
      "indices": v
    }
  end.to_json
end

post "/api/grid/:index" do |index|
  params = JSON.parse(request.body.read.to_s, symbolize_names: true)

  name = SecureRandom.hex 16
  txt = "/tmp/#{name}.txt"
  ppm = "/tmp/#{name}.ppm"
  png = "/tmp/#{name}.png"

  lines = params.map do |h|
    "#{h[:name]} #{h[:value]}\n"
  end

  File.open(txt, "w") do |file|
    file.write lines.join
  end

  `../bin/grid #{index} < #{txt} > #{ppm} && convert #{ppm} #{png}`

  data = File.read png

  content_type "image/png"
  Base64.encode64 data
end

post "/api/draw" do
  params = JSON.parse(request.body.read.to_s, symbolize_names: true)

  name = SecureRandom.hex 16
  txt = "/tmp/#{name}.txt"
  ppm = "/tmp/#{name}.ppm"
  png = "/tmp/#{name}.png"

  lines = []
  lines << "repeat #{params[:repeat]}"
  lines << "width #{params[:width]}"
  lines << "height #{params[:height]}"
  lines << "density #{params[:density]}"
  lines << "xaxis #{params[:xaxis][0]} #{params[:xaxis][1]}"
  lines << "yaxis #{params[:yaxis][0]} #{params[:yaxis][1]}"
  lines << "background #{params[:background].map(&:to_s).join(' ')}"

  params[:functions].each do |f|
    lines << "function #{f[:weight]} #{f[:R]} #{f[:G]} #{f[:B]} #{f[:a]} #{f[:b]} #{f[:c]} #{f[:d]} #{f[:e]} #{f[:f]}"
  end

  params[:variations].each do |v|
    lines << "variation #{v[:index]} #{v[:weight]}"
  end

  params[:parameters].each do |x|
    lines << "parameter #{x[:name]} #{x[:value]}"
  end

  File.open(txt, "w") do |file|
    file.write(lines.join("\n") + "\n")
  end

  `../bin/render --format ppm < #{txt} > #{ppm} && convert #{ppm} #{png}`

  data = File.read png

  `rm #{txt} #{ppm} #{png}`

  content_type "image/png"
  Base64.encode64 data
end
