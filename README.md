![Kubeman Logo](/static/kubeman-logo.png)
# Kubeman Rocks!
Slack Channel: #kubeman

## What's Kubeman?
Kubeman is a tool that aims to provide an easy way to view information in Kubernetes clusters and investigate issues related to Kubernetes and Istio. 

## How does it work?
Kubeman is offered as a desktop application that relies on your local saved kubernetes contexts (in kube config) to let you connect to up to 3 kubernetes clusters. Once connected to a cluster, you can view information from all namespaces that are available to your user account. Kubeman offers several recipes that can be executed against a cluster to view related information or perform certain investigation.

## Why Kubeman?
Prior to Kubeman, there was no comprehensive tool available in the Kubernetes community to perform complex investigation against Kubernetes and Istio clusters. User would have to rely on terminal utilities like kubectl and istioctl to read information from clusters and connect the dots oneself. Investigating any non-trivial issue would result in running 10s of commands and cross-referencing information from multiple commands. Kubeman simplifies such investigation tasks by performing relevant cross-referencing and analysis of related information. Such pre-defined analysis tasks are offered as recipes.

## How to use it?
1. Either download the application binary (currently pre-built binaries are offered for Mac and Win-64 OS), or get the source code and build it yourself (instructions at the bottom)
2. Use kuebctl (or another tool) to connect to a cluster, so that the cluster context gets saved in your local kube config.
3. Run Kubeman application
   ![Kubeman Application](/static/kubeman-application.png)
4. Click on "Select Cluster" button to select up to 3 clusters. You can optionally select one or more namespaces from the cluster selection dialog to limit your session to those namespaces for certain recipes.
   ![Select Cluster](/static/kubeman-select-cluster.png)
   ![Select Namespace](/static/kubeman-select-ns.png)
5. Your current selected context is shown in the top panel. This context defines the boundaries within which the recipes will operate. E.g. Many recipes that require namespace selection will not ask you to select namespaces anymore and instead use the selected namespaces from the context. Recipes that require pod selection will only show pods from the namespaces you selected in the context. When no namespaces are selected in the context, the recipes just work with clusters and will perform namespace, pods, etc selection on the fly from the entire cluster(s). Note that when working with clusters without pre-selected namespaces, some recipes's choice selection dialogs can take a while to load as they'll have to look at the entire cluster to find choices to present in the dialog.
   ![Selected Context](/static/kubeman-selected-context.png)
6. You'll see a menus panel on the left side of the application window. The recipes are grouped in menus based on focus areas. You can select a recipe to run from the menus panel by sliding open a menu group.
   ![Menus](/static/kubeman-menus.png)
7. Given the large number of recipes, finding a recipe from the menus can be daunting. You can simply look for recipes by typing some keywords in the search field above the menus panel. The matching recipes will show up in a separate menu option named "Matching Recipes". Complex searches can be done here (see complex search details further below)
   ![Recipe Search](/static/kubeman-recipe-search.png)   
8. Some recipes may ask you to make further selections (e.g. select namespaces, services, pods, etc).
   ![Recipe Choices Dialog](/static/kubeman-recipe-choices.png)   
9. The output panel that captures and shows outputs for all recipes provides some common behavior that can be used regardless of which recipe produced the output.
   * Once a recipe runs and produces output, you can use the search input field at the top of the output panel to search for some text in the recipe output. Hitting "escape" key deletes the search text when focus is in the search text field. Complex searches can be done here (see complex search details further below)
   ![Output Search](/static/kubeman-output-search.png)   
   * The output from each recipe is grouped into groups and subgroups. The topmost output row (rendered in dark blue) shows the heading of the output. Clicking on this header row compresses the entire output to only show groups and subgroups, essentially presenting a summary view of the entire output. Clicking on the header row again expands the entire output back to its normal detailed view.
   ![Overview Mode](/static/kubeman-overview-mode.png)
   * Similarly, clicking on a group row will collapse all its children rows to present a summary view of the group, showing its subgroups while hiding everything else. Clicking the group again opens it back to its normal detailed view. Same applies to the subgroup. Rows below subgroups (sections and individual data output rows) don't support the summary view.
   * While in overview mode, individual subgroups can be clicked to open and close them. This allows you to go into overview mode to scroll through a large output, and then click to open and view individual items of interest.
   ![Group Overview Mode](/static/kubeman-subgroup-view.png)
10. Some recipes allow you to enter commands/inputs, and they react on those inputs. E.g. "Find component by IP" recipe will wait till you input one or more IP addresses. In this case, the output search field plays dual role and also serves as a command input field for the recipe. To give input to a recipe, you type the input preceded by a "/". When a recipe supports command input, the text entered as "/<text>" is treated as input/command for the recipe instead of being used as search criteria. Some recipes support multiple input values separated by ",".
   ![Recipe Input](/static/kubeman-recipe-input.png)   
11. Some recipes support re-execution. In such cases, once the recipe has been produced, you'll see a "ReRun" button at the bottom of the menus panel. Clicking that button will run the recipe again with previously selected choices/input. Such recipes can also be rerun by entering command "/r".
12. Some recipes support clearing their output once the output has been produced. In such cases, you'll see a "Clear" button at the bottom of the menus panel. Clearing output can be also be done by sending a "/clear" or "/c" command to such recipes.
13. You'll see a "Stop" button at the bottom of the menus panel for most recipes. While Kubeman's recipes framework provides support for stopping recipes while they're running, not all recipes may be stopped once triggered. It's a best-effort feature.
14. Some recipes support automatic periodic execution. For such recipes, you'll see an "Auto Refresh" option at the bottom of the menus panel. If you select the "Auto Refresh" option, you can also specify a frequency for the auto refresh to happen. Recipes provide a default auto-refresh frequency value, and the auto refresh frequency cannot be set to a value lower than 5 seconds.
   ![Recipe Auto Refresh](/static/kubeman-autorefresh.png)
13. Any place where you can search in Kubeman allows advanced search using operators "or" and "!". By default all words (space separated) are used in conjunction ("and"). Operator "or" allows for disjunction query (A or B). Operator "!" can be used for negation, where it'll exclude all results that have keywords that follow the ! operator (e.g. "A B ! C D" will find results containing A and B, but will exclude those results that have C and D). Complex queries can be formed using these two operators (e.g. "A or B ! C" will find all results that have either "A", or have "B without C")
   ![Complex Search](/static/kubeman-complex-search.png)
15. Kubeman supports "dark theme". You can switch to dark theme by using the selector at the left-bottom of the application window.


## Recipes Overview
Kubeman offers recipes grouped by focus areas. There are 99 recipes in the release 0.3.

#### Cluster Recipes
These recipes either offer a cluster-wide overview or perform some analysis on the whole cluster.
###### Recipes:
- Clusters Overview, 
   ![Clusters Overview](/static/kubeman-clusters-overview.png)   
- Get Nodes Details
- Find Component By IP
   ![Find Component By IP](/static/kubeman-recipe-input.png)   

#### Events
These recipes let you view events at various levels.
###### Recipes:
- Cluster Events, Namespace Events, Pod Events, Service Events (shows pod events from all backing pods for a service)

#### Resources
These recipes let you view resources (kubernetes native resources as well as custom resources, e.g. Istio).
###### Recipes Examples: 
- List All CRDs, Compare CRDs, CRD Instances, List Gateways, List VirtualServices, List ServiceEntries, Compare Secrets, Compare ConfigMaps, etc.

#### Namespace Recipes
These recipes let you view or compare information from namespaces 
###### Recipes:
- List All Namespaces, 
- Compare Cluster Namespaces, 
   ![Compare Namespaces](/static/kubeman-compare-namespaces.png)   
- View All Resources in a Namespace, 
- View Namespace ConfigMaps 

#### Deployment Recipes
These recipes let you view or compare deployments 
###### Recipes:
- List Deployments for Namespaces 
- Container Resource Configs for Deployments
- Compare Namespace Deployments
- View Deployment Details
- Compare Two Deployments
   ![Compare Deployments](/static/kubeman-compare-deployments.png)   

#### Service Recipes
These recipes let you view or compare information related to services and/or their backing pods
###### Recipes:
- List Cluster Services: all services in a cluster
- List Namespace Services: all services in a namespace
- List All External Services: all "ExternalName" services
- Compare Namespace Services: compare services across namespaces
- View Service Details, 
- Compare Two Services
- Tail Service Logs, Tail Filtered Service Logs: tail logs from all backing pods for a service
- Execute Command on Service Pods: execute a command on all backing pods for a service (use '/c' to clear output, '&&' to concatenate multiple commands)
   ![Service Execute Command](/static/kubeman-service-command.png)   

#### Pod Recipes
These recipes let you view or compare information from selected pods
###### Recipes:
- List Namespace Pods: all pods in a namespace
- View Pod Addresses: IP addresses of all pods in a namespace
   ![Pod Addresses](/static/kubeman-pod-addresses.png)   
- View Pod(s) Details, View Pod(s) Status: details of one or more selected pods
- View Pod(s) Resource Configurations: view resource requests and limits config for all pods of a namespace
   ![Pod Resources](/static/kubeman-pod-resources.png)   
- Check Container Logs, Tail Container Logs, Tail Filtered Container Logs: let you check logs of one or more selected pod-containers
- Compare Two Pods
- Test Containers Reachability: performs a ping check from one another for all selected pod-containers
   ![Container Reachability](/static/kubeman-pod-reachability.png)   
- Execute Pod Command: execute a command on all selected pod-containers (use '/c' to clear output, '&&' to concatenate multiple commands)

#### Istio Ingress Recipes
These recipes let you view or analyze information related to Istio IngressGateway
###### Recipes:
- View Ingress Details (shows details of IngressGateway service, its backing pods and containers, and a list of VirtualServices and Gateways defined in the cluster for ingress)
- View Ingress Gateways and VirtualServices (a list of VirtualServices and Gateways defined in the cluster for ingress)
- Tail Ingress Logs, Tail Filtered Ingress Logs (let you check logs from all ingressgateway pods)
- Execute Command on Ingress Pods (execute a command on all ingressgateway pods)
- Find Overlapping Gateways (finds gateways with same host+port)
- Gateways with Missing Certs (finds gateways for which the referenced TLS cert secret is missing)
- Ingress Certs Report (a report of all gateways and matching virtualservices that are configured to use TLS certs)
   ![Certs Report](/static/kubeman-certs-report.png)   
- Compare Ingress (compare ingressgateway details between two clusters)
- Service Reachability from IngressGateway (test ping-based reachability of service pods from an ingressgateway pod)
   ![Service Reachability](/static/kubeman-service-reachability.png)   
- VirtualService Reachability from IngressGateway (test ping-based reachability of service pods backing a virtualservice from an ingressgateway pod)
- IngressGateway Envoy Bootstrap, IngressGateway Envoy Clusters, IngressGateway Envoy Listeners, IngressGateway Envoy Routes, IngressGateway Envoy Stats, IngressGateway Envoy ServerInfo (view envoy configs and metrics from selected ingressgateway pods)
- Compare Ingress Envoy Configs (compare envoy configs from two selected ingressgateway pods)
- Check Ingress Envoy Listen Status (reports whether ingressgateway pods are listening on ports present in envoy listener configs, for all ingressgateway pods)
- IngressGateway Config for Service (shows relevant envoy configs from an ingressgateway pod for a selected service)

#### Istio Pilot Recipes
These recipes let you view or analyze information related to Istio Pilot
###### Recipes:
- Execute Command on Pilot Pods (execute a command on all pilot pods)
- Tail Pilot Logs, Tail Filtered Pilot Logs (let you check logs from all pilot pods)
- View Pilot Metrics (metrics collected from pilot pods)
- View Service Endpoints Known to Pilot (check endpoints that pilot is aware of for a selected service)
- View Envoy Clusters Config from Pilot, View Envoy Listeners Config from Pilot, View Envoy Routes Config from Pilot (check envoy configs that pilot has sent to a selected envoy proxy, including ingressgateway pods)
- View Pilot-Envoy Sync Status (check sync status of pilot and various envoy proxies, including ingressgateway pods)
- Compare Pilot-Envoy Config (compare envoy configs from a selected envoy proxy and the corresponding configs from pilot)
- Compare Pilot-Envoy Listeners Config (compare envoy listeners configs from a selected envoy proxy and the corresponding configs from pilot)

#### Envoy Proxy Recipes
These recipes let you view or analyze information related to envoy proxies deployed as a part of Istio mesh
###### Recipes:
- List Envoy Proxies (see a list of all envoy proxies running in the cluster)
- Envoy Sidecar Injection Report (list of namespaces that have sidecar injection enabled)
- Tail Envoy Logs (check logs of a selected envoy proxy)
- Envoy Bootstrap Config, Envoy Clusters Config, Envoy Listeners Config, Envoy Routes Config, Envoy Stats, Envoy ServerInfo (view envoy configs and metrics from selected envoy proxies)
- Compare Envoy Configs (compare envoy configs from two selected envoy proxies)

#### More Istio Recipes
Sundry recipes related to Istio
###### Recipes:
- View Istio Versions, View Egress Details
   ![Istio Versions](/static/kubeman-istio-versions.png)   

#### Analysis Recipes
These recipes focus on advanced analysis of information from various components, service a specific focused task
###### Recipes:
- Analyze Service Details and Routing (analyze routing related details for a selected service)
- Analyze Service mTLS Status (analyze mTLS setup related to a selected service)
   ![mTLS Status](/static/kubeman-mtls-status.png)   
- Cluster mTLS Report (see a report of mTLS setup for the cluster)


## To build and run the app
PreRequisite: Node.js and npm

1. Clone repo
2. 'npm install' - to install dependencies
3. 'npm run dev' - to run app in dev mode
4. 'npm run dist' - to package the app for distribution. This builds kubeman.app (mac) application in the dist/mac folder
