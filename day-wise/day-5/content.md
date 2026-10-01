# Day 5: Introduction to SAP Business Technology Platform

**Module:** Module 2<br>
**Date:** 5 October 2026

This module introduces SAP Business Technology Platform (SAP BTP), the Cloud Foundry environment, and the steps for creating a trial account and enabling SAP Integration Suite.

## Unit 1: Introduction to SAP Business Technology Platform

### What Is SAP Business Technology Platform?

![Image 1: SAP Business Technology Platform](images/1.png)

![Image 2: Introduction to SAP BTP](images/2.png)


![Image 3: SAP BTP benefits](images/3.png)


![Image 4: SAP BTP architecture](images/4.png)

### Landscape Architecture


![Image 5: Cloud computing](images/5.png)


![Image 6: Cloud service models overview](images/6.png)

#### Cloud Service Models: PaaS

![Image 7: Platform as a Service (PaaS)](images/7.png)

#### Cloud Service Models: IaaS

![Image 8: Infrastructure as a Service (IaaS)](images/8.png)

#### Cloud Service Models: SaaS

![Image 9: Software as a Service (SaaS)](images/9.png)

![Image 10: Deployment models](images/10.png)


![Image 11: Deployment models high-level overview](images/11.png)

#### Deployment Models: Managed Model

![Image 12: Managed deployment model](images/12.png)

#### Deployment Models: On-Premises Model

![Image 13: On-premises deployment model](images/13.png)

#### Deployment Models: Hybrid Model

![Image 14: Hybrid deployment model](images/14.png)

#### Deployment Models: Private Model

![Image 15: Private deployment model](images/15.png)

#### Deployment Models: Public Model

![Image 16a: Public deployment model](images/16a.png)

![Image 16b: Public deployment model](images/16b.png)

### Data Centers

![Image 17: Data center introduction](images/17.png)

#### Components

![Image 18a: Data center components](images/18a.png)

![Image 18b: Data center components](images/18b.png)

![Image 18c: Data center components](images/18c.png)

![Image 18d: Data center components](images/18d.png)

#### Product Capabilities

![Image 19: Product capabilities](images/19.png)

Reference: [SAP BTP documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US)

## Unit 2: Introduction to SAP BTP Cloud Foundry

![Image 20: SAP BTP Cloud Foundry](images/20.png)

### Cloud Foundry

![Image 21: Cloud Foundry introduction](images/21.png)

![Image 22: SAP Cloud Foundry environment](images/22.png)

![Image 23: Buildpacks and services](images/23.png)

#### SAP Service Marketplace

![Image 24: Services in the SAP Service Marketplace](images/24.png)

#### Cloud Foundry Environment Terminology

![Image 25a: Cloud Foundry terminology](images/25a.png)

![Image 25b: Cloud Foundry terminology](images/25b.png)

Reference: [SAP Cloud Foundry environment documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/9c7092c7b7ae4d49bc8ae35fdd0e0b18.html)

## Unit 3: Creating an SAP BTP Trial Account

![Image 26: Creating an SAP BTP trial account](images/26.png)

### SAP BTP Landing Page

![Image 27: SAP BTP landing page](images/27.png)

## SAP BTP Integration Developer: Step-by-Step Setup Guide

### Phase 1: Sign Up and Create a Subaccount

1. **Open the portal:** Go to the [SAP BTP Trial Registration Page](https://account.hana.ondemand.com/#/home/welcome) and select **Register** or **Sign Up**.
2. **Verify your email:** Complete the registration form. Open the verification email and follow its activation link.
3. **Log in:** Open the [SAP BTP Cockpit](https://ondemand.com) and sign in with your new credentials.
4. **Initialize your trial:** Select **Enter Your Trial Account**. The platform initializes a global account and default trial subaccount; wait for setup to finish.

### Phase 2: Create the Integration Suite Instance

1. **Open your subaccount:** Select the **trial** tile to open its dashboard.
2. **Open the marketplace:** From the left navigation, select **Services** > **Service Marketplace**.
3. **Find Integration Suite:** Search for **Integration Suite**.
4. **Create the subscription:** Open the Integration Suite card's menu, select **Create**, keep the default `trial` plan, and select **Create** again.

If Integration Suite is unavailable, check **Entitlements** and add it to the subaccount's allocations if your trial account offers it.

### Phase 3: Assign Security Roles

Assign the required permissions before opening the Integration Suite dashboard.

1. From the cockpit navigation, select **Security** > **Users**.
2. Select your username or email address.
3. Select **Assign Role Collection**, find and select `Integration_Provisioner`, then confirm the assignment.
4. If available and needed, also assign `PI_Administrator` or `PI_Integration_Developer`.

### Phase 4: Launch Integration Suite

1. From the navigation, select **Services** > **Instances and Subscriptions**.
2. Find **Integration Suite** under **Subscriptions** and select **Go to Application**.
3. On first launch, select **Add Capabilities** or **Manage Capabilities**, choose **Build Integration Scenarios (Cloud Integration)**, and select **Activate**.
4. Wait for activation to complete. It can take 10–15 minutes. Refresh the page afterward to check for the **Design** and **Monitor** capabilities.

> Trial availability, cockpit labels, role collections, and activation options can vary by account and SAP's current offering. Follow the options shown in your tenant and consult the SAP Help Portal if a step is unavailable.