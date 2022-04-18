#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <stdbool.h>
#include <time.h>
#include <queue>
#include <vector>
#include <iostream>

using namespace std;

int nResources, nProcesses;
int *resources;
int **allocated;
int **maxRequired;
int **need;
int *safeSeq;
int nProcessRan = 0;

pthread_mutex_t lockResources;
pthread_cond_t condition;

bool getSafeSeq();
void* processCode(void* );

int main(int argc, char** argv) {
    cout << "Number of processes: ";
    cin >> nProcesses;

    cout << "Number of resources: ";
    cin >> nResources;

    cout << "\n";
    resources = (int *)malloc(nResources * sizeof(*resources));
    cout << "Total Available resources (R1 R2 ...): ";
    for(int i = 0; i < nResources; i++) cin >> resources[i];

    allocated = (int **)malloc(nProcesses * sizeof(*allocated));
    for(int i = 0; i < nProcesses; i++) allocated[i] = (int *)malloc(nResources * sizeof(**allocated));

    maxRequired = (int **)malloc(nProcesses * sizeof(*maxRequired));
    for(int i = 0; i < nProcesses; i++) maxRequired[i] = (int *)malloc(nResources * sizeof(**maxRequired));

    cout << "\n";
    for(int i = 0; i < nProcesses; i++) {
        cout << "Resource allocated to process " << i << " (R1 R2 ...): ";

        for(int j=0; j<nResources; j++) cin >> allocated[i][j];
    }
    cout << "\n";
    for(int i = 0; i < nProcesses; i++) {
        cout << "Maximum resource required by process " << i << " (R1 R2 ...): ";
        for(int j=0; j<nResources; j++) scanf("%d", &maxRequired[i][j]);
    }
    cout << "\n";
    for(int i = 0; i < nResources; i++) {
        int sum = 0;
        for(int j = 0; j < nProcesses; j++) {
            sum += allocated[j][i];
        }
        resources[i] -= sum;
    }


    need = (int **)malloc(nProcesses * sizeof(*need));
    for(int i = 0; i < nProcesses; i++) need[i] = (int *)malloc(nResources * sizeof(**need));

    for(int i = 0; i < nProcesses; i++) {
        for(int j = 0; j < nResources; j++) need[i][j] = maxRequired[i][j] - allocated[i][j];
    }

	safeSeq = (int *)malloc(nProcesses * sizeof(*safeSeq));
    for(int i = 0; i < nProcesses; i++) safeSeq[i] = -1;

    if(!getSafeSeq()) {
        cout << "Unsafe State! The processes leads the system to a unsafe state.\n\n";
        exit(-1);
    }

    cout << "Safe Sequence Found : ";
    for(int i = 0; i < nProcesses; i++) {
        cout << safeSeq[i] << " ";
    }
    cout << "\n";
    cout << "Executing Processes...\n\n";
    sleep(1);

	pthread_t processes[nProcesses];
    pthread_attr_t attr;
    pthread_attr_init(&attr);

	int processNumber[nProcesses];
	for(int i = 0; i < nProcesses; i++) processNumber[i] = i;

    for(int i = 0; i < nProcesses; i++) pthread_create(&processes[i], &attr, processCode, (void *)(&processNumber[i]));

    for(int i = 0; i < nProcesses; i++) pthread_join(processes[i], NULL);
    cout << "\nAll Processes Finished\n";

    free(resources);
    for(int i = 0; i < nProcesses; i++) {
        free(allocated[i]);
        free(maxRequired[i]);
		free(need[i]);
    }
    free(allocated);
    free(maxRequired);
	free(need);
    free(safeSeq);
}


bool getSafeSeq() {
    queue<vector<int>> ready, processed;
    vector<int> tempRes;
    for(int i = 0; i < nResources; i++) tempRes.push_back(resources[i]);
    for(int i = 0; i < nProcesses; i++) {
        vector<int> process;
        process.push_back(i);
        for(int j = 0; j < nResources; j++) {
            process.push_back(need[i][j]);
        }
        ready.push(process);
    }

    int loopCount = 0;
    int N = 0;
    while(!ready.empty()) {
        vector<int> process = ready.front();
        ready.pop();
        bool safe = true;
        for(int i = 0; i < nResources; i++) {
            if(process[i+1] > tempRes[i]) {
                ready.push(process);
                safe = false;
                break;
            }
            else safe = true;
        }
        if(!safe) {
            loopCount++;
            if(loopCount > ready.size()) return false;
        }
        else {
            loopCount = 0;
            processed.push(process);
            for(int i = 0; i < nResources; i++) {
                tempRes[i] += process[i+1];
            }
            safeSeq[N] = process[0];
            N++;
        }
    }
    return true;
}

void* processCode(void *arg) {
    int p = *((int *) arg);


    while(p != safeSeq[nProcessRan]) {
        pthread_cond_wait(&condition, &lockResources);
    }
    pthread_mutex_lock(&lockResources);

    cout << "--> Process " <<  p << ": \n";
    cout << "Allocated: ";
    for(int i = 0; i < nResources; i++) cout << allocated[p][i] << " ";

    cout << "\nNeeded: ";
    for(int i = 0; i < nResources; i++) cout << need[p][i] << " ";

    cout << "\nAvailable: ";
    for(int i = 0; i < nResources; i++) cout << resources[i] << " ";

    cout << "\n"; sleep(1);

    cout << "Resource Allocated!\n";
    sleep(1);
    cout << "Process Code Running\n";
    sleep(rand()%3 + 2);
    cout << "Process Code Completed\n";
    sleep(1);
    cout << "Process Releasing Resource\n";
    sleep(1);
    cout << "Resource Released!\n";

	for(int i = 0; i < nResources; i++) resources[i] += allocated[p][i];
    cout << "Now Available : ";
    for(int i = 0; i < nResources; i++) cout << resources[i] << " ";
    cout << "\n\n";

    sleep(1);

    nProcessRan++;
    pthread_mutex_unlock(&lockResources);
    pthread_cond_broadcast(&condition);

	pthread_exit(NULL);
	return arg;
}
