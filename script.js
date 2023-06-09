nodes = []
nodes_position = []
edges = []
selected = null;
const MAX_NUM_OF_NODES = 20;

function add_node() {
    if (nodes.length < MAX_NUM_OF_NODES) {
        index = nodes.push([nodes.length, 0]) - 1;
        add_new_node(nodes[index][0]);
        calcule_position_nodes();
        calcule_position_edges();
        update_table_colors();
    }
}

function remove_node() {
    if (nodes.length > 0) {
        document.getElementById(nodes.length - 1).remove()
        node_removed = nodes.pop();
        if (selected == node_removed[0]) {
            selected = null;
        }
    }

    if (nodes.length > 0) {
        remove_line(node_removed[0]);
        calcule_position_nodes();
        calcule_position_edges();
        update_table_colors();
    }
}

function selected_node(index) {
    index = Number(index);
    if (selected == null) {
        selected = index;
        document.getElementById(index).classList.add("node_selected");
    } else if (selected == index) {
        selected = null;
        document.getElementById(index).classList.remove("node_selected");
    } else {
        edges.push([selected, index]);
        document.getElementById(selected).classList.remove("node_selected");
        add_new_line(nodes_position[selected], nodes_position[index]);
        selected = null;
        calcule_color_to_node();
        update_table_colors();
    }
}

function remove_line(node_number) {
    for (x = edges.length - 1; x >= 0; x--) {
        if (edges[x][0] == node_number || edges[x][1] == node_number) {
            document.getElementsByClassName('edge')[x].remove()
            edges.splice(x, 1);
        }
    }
}

function get_available_color(node) {
    for (color = 1; color <= MAX_NUM_OF_NODES; color++) {
        is_color = false;
        for (x = 0; x < edges.length; x++) {
            if (edges[x][0] == node || edges[x][1] == node) {
                is_color = true;
            }

            if (edges[x][0] == node && nodes[edges[x][1]][1] == color) {
                is_color = false;
                break;
            } else if (edges[x][1] == node && nodes[edges[x][0]][1] == color) {
                is_color = false;
                break;
            }
        }
        if (is_color == true) {
            return color;
        }
    }
}

function calcule_color_to_node() {
    for (node in nodes) {
        nodes[node][1] = 0;
    }

    for (node in nodes) {
        for (edge in edges) {
            if (edges[edge][0] == nodes[node][0] || edges[edge][1] == nodes[node][0]) {
                nodes[node][1] = get_available_color(nodes[node][0])
            }
        }
    }

    for (node in nodes) {
        if (nodes[node][1] != 0) {
            color = 'hsl(' + ((360 / nodes.length) * nodes[node][1]) + ', 100%, 50%)';
            document.getElementById(nodes[node][0]).style.backgroundColor = color;
            document.getElementById(nodes[node][0]).style.color = '#000000';
        }
    }
}

function update_table_colors() {
    new_text = '<tr><th>Node</th><th>Color</th></tr>'
    for (node in nodes) {
        new_text += "<tr><td>"
        new_text += nodes[node][0]
        new_text += "</td><td>"
        if (nodes[node][1] != 0) {
            new_text += nodes[node][1]
        } else {
            new_text += "-"
        }
        new_text += "</tr>"
    }
    document.getElementById("colors_view").innerHTML = new_text
}

function calcule_position_nodes() {
    nodes_position = []
    for (i in nodes) {
        angle_node = Number(360 / nodes.length * i);
        node = document.getElementById(nodes[i][0]);
        x = 200 * Math.sin(angle_node * Math.PI / 180);
        y = 200 * -Math.cos(angle_node * Math.PI / 180);
        node.style.translate = x + 'px ' + y + 'px';
        nodes_position.push([x, y]);
    }
}

function calcule_position_edges() {
    edges_a = document.getElementsByClassName("edge");

    for (edge_index in edges) {
        node1 = nodes_position[edges[edge_index][0]]
        node2 = nodes_position[edges[edge_index][1]]
        edges_a[edge_index].setAttribute('x1', node1[0] + 200 + 'px');
        edges_a[edge_index].setAttribute('y1', node1[1] + 200 + 'px');
        edges_a[edge_index].setAttribute('x2', node2[0] + 200 + 'px');
        edges_a[edge_index].setAttribute('y2', node2[1] + 200 + 'px');
    }
}

function add_new_node(name) {
    const newDiv = document.createElement("div");
    newDiv.classList.add('node');
    newDiv.setAttribute('id', name);
    newDiv.setAttribute('onclick', 'selected_node(this.id)');
    newDiv.innerText = name;
    const currentDiv = document.getElementById("graph");
    currentDiv.appendChild(newDiv);
}

function add_new_line(node1, node2) {
    const newDiv = document.createElement("line");
    newDiv.classList.add('edge');
    newDiv.setAttribute('x1', node1[0] + 200 + 'px');
    newDiv.setAttribute('y1', node1[1] + 200 + 'px');
    newDiv.setAttribute('x2', node2[0] + 200 + 'px');
    newDiv.setAttribute('y2', node2[1] + 200 + 'px');
    newDiv.setAttribute('stroke', '#4A4A4A');
    newDiv.setAttribute('stroke-width', '2px');
    const currentDiv = document.getElementById("lines");
    currentDiv.appendChild(newDiv);
    currentDiv.innerHTML = currentDiv.innerHTML
}