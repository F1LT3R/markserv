import fs from 'fs'
import path from 'path'
import request from 'request'
import test from 'ava'
import getPort from 'get-port'
import cli from '../lib/cli'

test.cb('start markserv via "cli" command opening file in different dir', t => {
	t.plan(3)

	const expected = String(
		fs.readFileSync(
			path.join(__dirname, 'markserv-cli-file-diff-dir.expected.html')
		)
	)

	getPort().then(port => {
		const cliOpts = {
			input: ['tests/markserv-cli-file-diff-dir.expected.html'],
			flags: {
				port,
				livereloadport: false,
				address: 'localhost',
				silent: true,
				browser: false
			}
		}

		const done = () => {
			t.end()
		}

		cli.run(cliOpts).then(service => {
			const closeServer = () => {
				service.httpServer.close(done)
			}

			const opts = {
				url: service.launchUrl,
				timeout: 1000 * 2
			}

			request(opts, (err, res, body) => {
				if (err) {
					t.fail(err)
					closeServer()
				}

				t.true(body.includes(expected))

				t.is(res.statusCode, 200)
				t.pass()
				closeServer()
			})
		}).catch(error => {
			t.fail(error)
			t.end()
		})
	})
})

test.cb('start markserv via "cli" command opening file in different dir with preceeding ./', t => {
	t.plan(3)

	const expected = String(
		fs.readFileSync(
			path.join(__dirname, 'markserv-cli-file-diff-dir.expected.html')
		)
	)

	getPort().then(port => {
		const cliOpts = {
			input: ['./tests/markserv-cli-file-diff-dir.expected.html'],
			flags: {
				port,
				livereloadport: false,
				address: 'localhost',
				silent: true,
				browser: false
			}
		}

		const done = () => {
			t.end()
		}

		cli.run(cliOpts).then(service => {
			const closeServer = () => {
				service.httpServer.close(done)
			}

			const opts = {
				url: service.launchUrl,
				timeout: 1000 * 2
			}

			request(opts, (err, res, body) => {
				if (err) {
					t.fail(err)
					closeServer()
				}

				t.true(body.includes(expected))

				t.is(res.statusCode, 200)
				t.pass()
				closeServer()
			})
		}).catch(error => {
			t.fail(error)
			t.end()
		})
	})
})
