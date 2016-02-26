# graphite-cli - CLI Tools for Graphite
graphite-cli is a set of node.js command line tools created to make working with Graphite simpler. A crude set of commands are supported thus far:
* `cat` - Dumps raw dashboard definition to stdout
* `cp` - Copies source dashboard to target dashboard
* `diff` - Lists the differences in graphs between source and target dashboards
* `dump` - Dumps pretty printed dashboard to file of same name
* `dump-graphs` - Dumps pretty printed graphs in custom format to file of same name
* `ls` - Lists dashboards
* `ls-graphs` - Lists graphs in dashboard
* `ls-targets` - Lists all targets in all graphs in a dashboard
* `mv` - Moves source dashboard to target dashboard
* `repl` - Interactive dashboards in a node REPL
* `rm` - Deletes dashboard
* `save-dump` - Saves dump back to dashboard
* `save-graphs` - Saves graphs dump back to dashboard
* `touch` - Creates a new, empty dashboard 

## Installation

```bash
npm install -g graphite-cli # Install from repository
npm install -g git+https://github.com/jwolski/graphite-cli # install from gitlab
```

## Usage

graphite-cli uses the `GRAPHITE_CLI_URL` environment variable as the basis for all commands that require requests to be made against the Graphite web server. This must be set in your environment before execution.

### cat

Dumps raw dashboard definition to stdout

```bash
graphite cat <dashboard-name>
```

### cp

Copies source dashboard to target dashboard

```bash
graphite cp <source-dashboard-name> <target-dashboard-name>
```

### diff

Lists the differences in graphs between the source and target dashboards

```bash
graphite diff <source-dashboard-name> <target-dashboard-name>
```

### dump

Dumps dashboard JSON to a file of the same name. JSON is pretty-printed and follows the same structure returned from Graphite. A `.json` file extension is added onto the file if one is not provided.

```bash
graphite dump <dashboard-name>
```

Options

```bash
-p, --path <path> Path to which dashboards are dumped
```

### dump-graphs

Dumps dashboard JSON to a file of the same name. JSON is pretty-printed and follows a custom object structure to make graphs and associated targets/stats more readable and easy to edit. See `save-graphs` for the complement command. A `.json` file extension is added onto the file if one is not provided.

```bash
graphite dump-graphs <dashboard-name>
```

The custom object structure is as follows:

```javascript
{
    "name": "DASHBOARD_NAME"
    "graphs": [
        {
            "title": "GRAPH_TITLE"
            "stats": [
                "FIRST_TARGET",
                "SECOND_TARGET",
                "etc"
            ] 
        }
    ]
}
```

### ls

Lists dashboards with an optional search string

```bash
graphite ls [search]
```

### ls-graphs

Lists graphs in a dashboard in alphabetical order.

```bash
graphite ls-graphs <dashboard-name>
```

### ls-targets

Lists targets in all graphs of a dashboard in alphabetical order

```bash
graphite ls-targets <dashboard-name>
```

### mv

Moves a dashboard from source to target

```bash
graphite mv <source-dashboard-name> <target-dashboard-name>
```

### repl

Starts an interactive dashboard repl. A `client` object is provided in global scope for you to interact with as soon as the repl is started.

```bash
graphite repl
graphite> ...
```

### rm

Removes a dashboard

```bash
graphite rm <dashboard-name>
```

### save-dump

Saves a dashboard dump (see `dump`) back to the dashboard of the same name. This is a destructive override. Be careful. The dashboard dump file extension is optional.

```bash
graphite save-dump <dashboard-dump-filename>
```

### save-graphs

Saves a graph dump (see `dump-graphs`) back to the dashboard of the same name. This is a destructive override. Be careful. The graph dump file extension is optional.

```bash
graphite save-graphs <graphs-dump-filename>
```

### touch

Creates a new, blank dashboard with the specified name.

```bash
graphite touch <dashboard-name>
```
