#!/bin/bash

ansible-playbook -i ansible/hosts ansible/playbooks/deploy_dev.yml
