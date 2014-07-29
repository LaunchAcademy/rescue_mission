require 'rake'

task :run do
  pids = [
    spawn('cd backend && rails s'),
    spawn('cd frontend && ./node_modules/.bin/ember server --proxy http://localhost:3000'),
  ]

  trap 'INT' do
    Process.kill 'INT', *pids
    exit 1
  end

  loop do
    sleep 1
  end
end
