/**
 * Updated Detailed User Profile Context Overlay Summary Modal Processing Architecture Engine
 * Supports editing details and approving designer subaccount codes with admin password confirmation.
 */
function launchDetailedUserProfileContextOverlaySummaryModal(userIdTokenKeyParameterValue) {
    const targetUserObjMatchRecord = SYSTEM_DATABASE.users.find(u => u.uid === userIdTokenKeyParameterValue || u.id === userIdTokenKeyParameterValue);
    if (!targetUserObjMatchRecord) return;
    const standardModalBodyElementNode = document.getElementById("product-detail-modal-body");
    if (!standardModalBodyElementNode) return;
    
    let subAccountClassificationMetadataDetailsBlockHTML = "";
    if (targetUserObjMatchRecord.accountType === 'business' || targetUserObjMatchRecord.type === 'business') {
        subAccountClassificationMetadataDetailsBlockHTML = `
            <div style="background-color:var(--fort-white-snow); padding:14px; border:1px solid var(--fort-gray-border);" class="rounded-rect margin-top-xs">
                <h5 style="text-transform:uppercase; font-size:0.7rem; color:var(--fort-gray-slate); letter-spacing:0.5px;">Bank & Business Parameters</h5>
                <p style="font-size:0.95rem; font-weight:700; color:var(--fort-blue-dark); margin-top:4px;">Bank Info: ${targetUserObjMatchRecord.businessName || 'N/A'}</p>
                <p style="font-size:0.88rem; color:var(--fort-blue-primary); line-height:1.4; margin-top:4px;">Account Name: ${targetUserObjMatchRecord.businessInfo || 'N/A'}</p>
                <p style="font-size:0.88rem; color:var(--fort-blue-primary); line-height:1.4; margin-top:4px;">Abilities/Deals: ${targetUserObjMatchRecord.productsDealtIn || 'N/A'}</p>
            </div> 
        `;
    } else {
        subAccountClassificationMetadataDetailsBlockHTML = `
            <div style="background-color:var(--fort-white-snow); padding:14px; border:1px solid var(--fort-gray-border);" class="rounded-rect margin-top-xs">
                <h5 style="text-transform:uppercase; font-size:0.7rem; color:var(--fort-gray-slate); letter-spacing:0.5px;">User Info</h5>
                <p style="font-size:0.95rem; font-weight:700; color:var(--fort-blue-dark); margin-top:4px;">${targetUserObjMatchRecord.identityName || targetUserObjMatchRecord.username || ''}</p>
            </div>
        `;
    }

    // ADMINISTRATIVE CONTROL LAYER
    let administrativeControlsInlineHTML = "";
    if (APP_STATE.currentUser && (APP_STATE.currentUser.uid === 'admin' || APP_STATE.currentUser.id === 'admin')) {
        const rawVerificationCode = targetUserObjMatchRecord.UserAccountAuthenticationVerificationCode || targetUserObjMatchRecord.verificationCode || 'N/A';
        const currentGovernanceStatus = targetUserObjMatchRecord.verificationStatus || targetUserObjMatchRecord.status || 'unverified';
        const currentAccountType = targetUserObjMatchRecord.accountType || targetUserObjMatchRecord.type || 'personal';
        const registrationContactIdentifier = targetUserObjMatchRecord.identifierText || '';
        const securityAccessPassword = targetUserObjMatchRecord.secretKey || targetUserObjMatchRecord.password || '';
        const uid = targetUserObjMatchRecord.uid || targetUserObjMatchRecord.id || '';
        const currentSubaccountCode = targetUserObjMatchRecord.subaccountCode || '';

        administrativeControlsInlineHTML = `
            <div style="margin-top:12px; margin-bottom:12px; padding:14px; background:#f7fafc; border:1px solid #cbd5e0; border-radius:8px; display:flex; flex-direction:column; gap:10px;">
                <h5 style="margin:0; text-transform:uppercase; font-size:0.75rem; color:var(--fort-gray-slate); letter-spacing:0.5px;">🛡️ Administrative Console Workspace</h5>
                
                <div style="display:flex; gap:8px;">
                    <div style="flex:1;">
                        <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Registration Contact:</span>
                        <input type="text" id="adm-user-identifier-text" class="form-field-control" style="margin-top:4px; font-family:monospace;" value="${registrationContactIdentifier}">
                    </div>
                    <div style="flex:1;">
                        <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Account Password:</span>
                        <input type="text" id="adm-user-security-password" class="form-field-control" style="margin-top:4px; font-family:monospace;" value="${securityAccessPassword}">
                    </div>
                </div>

                <div>
                    <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Paystack Subaccount Code:</span>
                    <input type="text" id="adm-user-subaccount-code" class="form-field-control" style="margin-top:4px; font-family:monospace;" placeholder="e.g. ACCT_xxxxxxxxx" value="${currentSubaccountCode}">
                </div>

                <div>
                    <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">OTP Verification Code:</span>
                    <input type="text" id="UserAccountAuthenticationVerificationCode" class="form-field-control" style="margin-top:4px;" value="${rawVerificationCode}">
                </div>

                <div>
                    <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">User ID:</span>
                    <input type="text" id="UserIdAdminSeen" class="form-field-control" style="margin-top:4px;" value="${uid}" disabled>
                </div>

                <div>
                    <span style="font-size:0.82rem; color:var(--fort-gray-slate); font-weight:700;">Manage Account Type:</span>
                    <select id="adm-change-account-type" class="form-field-control" style="margin-top:4px;">
                        <option value="personal" ${currentAccountType === 'personal' ? 'selected' : ''}>Personal Account</option>
                        <option value="business" ${currentAccountType === 'business' ? 'selected' : ''}>Designer (Commercial) Account</option>
                    </select>
                </div>
                
                <div style="font-size:0.82rem; color:var(--fort-blue-dark); margin-top:2px;">
                    Current Verification Status: <strong id="lbl-inspector-active-status-tag" data-pending-status-value="${currentGovernanceStatus}" style="text-transform:uppercase;">${currentGovernanceStatus}</strong>
                </div>
                
                <div class="btn-group" style="margin-top:4px; gap:8px;">
                    <button class="btn-blue" style="padding:6px 12px; font-size:0.8rem;" onclick="executeInlineAdminSave('${uid}')">Apply Policy Changes</button>
                    ${currentGovernanceStatus !== 'verified' ? `<button class="btn-blue" style="padding:6px 12px; font-size:0.8rem; background-color:#28a745; border-color:#28a745;" onclick="promptAdminPasswordConfirmationForApproval('${uid}')">Approve Account</button>` : ''}
                    <button class="btn-gray" style="padding:6px 12px; font-size:0.8rem;" onclick="(() => {
                        const tag = document.getElementById('lbl-inspector-active-status-tag');
                        const nextStatus = tag.getAttribute('data-pending-status-value') === 'verified' ? 'unverified' : 'verified';
                        tag.setAttribute('data-pending-status-value', nextStatus);
                        tag.textContent = nextStatus;
                    })()">Toggle Verification State</button>
                </div>
            </div>
        `;
    }

    // USER'S PRODUCTS GRID VIEW LOOP LAYER
    let userProductsListHTML = "";
    if (targetUserObjMatchRecord.accountType === 'business' || targetUserObjMatchRecord.type === 'business') {
        let currencySymbol = (!APP_STATE.currentUser || APP_STATE.currentUser.country === 'Nigeria') ? '₦' : '$';
        const sellerProducts = SYSTEM_DATABASE.products.filter(p => p.ownerUid === targetUserObjMatchRecord.uid || p.ownerUid === targetUserObjMatchRecord.id);
        
        let productsGridItemsHTML = "";
        if (sellerProducts.length > 0) {
            sellerProducts.forEach(product => {
                const imgUrl = product.coverPhoto || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e0'><path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>";
                productsGridItemsHTML += `
                    <div class="profile-product-item-row" style="display:flex; align-items:center; gap:12px; padding:8px; background:var(--fort-white-snow); border:1px solid var(--fort-gray-border); border-radius:6px; cursor:pointer;" onclick="closeActiveModalDirectly('product-detail-modal'); launchComprehensiveProductSpecificationsExpandedModalView('${product.pid}')">
                        <img src="${imgUrl}" style="width:50px; height:50px; object-fit:contain; border-radius:4px; background:#fcfcfc; border:1px solid #e2e8f0;" alt="${product.name}">
                        <div style="flex:1; min-width:0;">
                            <h4 style="margin:0; font-size:0.9rem; color:var(--fort-blue-dark); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${product.name}</h4>
                            <div style="font-size:0.85rem; font-weight:700; color:var(--fort-blue-light); margin-top:2px;">${currencySymbol}${product.price.toLocaleString()}</div>
                        </div>
                    </div>
                `;
            });
        } else {
            productsGridItemsHTML = `<p style="font-size:0.88rem; color:var(--fort-gray-slate); font-style:italic; margin:0; padding:4px;">This business user does not have any active product.</p>`;
        }

        userProductsListHTML = `
            <div class="user-products-section-block" style="margin-top:14px; margin-bottom:14px;">
                <h5 style="text-transform:uppercase; font-size:0.75rem; color:var(--fort-gray-slate); letter-spacing:0.5px; margin-bottom:8px;">Active Product Catalog (${sellerProducts.length})</h5>
                <div style="display:flex; flex-direction:column; gap:8px; max-height:220px; overflow-y:auto; padding-right:4px;">
                    ${productsGridItemsHTML}
                </div>
            </div>
        `;
    }

    let userProfilePhotoSrc = targetUserObjMatchRecord.avatar || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>";
    
    standardModalBodyElementNode.innerHTML = `
        <div class="modal-expanded-header-row" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--fort-gray-border); padding-bottom:14px;">
            <h3>User Profile Identity Summary Context</h3>
            <button onclick="closeActiveModalDirectly('product-detail-modal')" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">✕</button>
        </div>
        
        <div class="modal-expanded-content-split-grid margin-top-md" style="display:grid; grid-template-columns: 100px 1fr; gap:20px; align-items:start;">
            <div class="profile-left-avatar-frame">
                <img src="${userProfilePhotoSrc}" class="circle-container" style="width:100px; height:100px; object-fit:cover; border:2px solid var(--fort-blue-primary);" alt="User Profile Photo">
            </div>
            
            <div class="profile-right-fields-column" style="display:flex; flex-direction:column;">
                <h2 style="color:var(--fort-blue-dark); font-weight:800; margin:0;">${targetUserObjMatchRecord.identityName || ''}</h2>
                <span style="font-size:0.82rem; color:var(--fort-gray-slate); margin-top:2px;">Account Class: <strong style="text-transform:uppercase;">${targetUserObjMatchRecord.accountType || targetUserObjMatchRecord.type || 'personal'}</strong></span>
                <span style="font-size:0.82rem; color:var(--fort-gray-slate); margin-top:2px;">Operational Region: <strong>${targetUserObjMatchRecord.country || 'Nigeria'}</strong></span>
                
                ${subAccountClassificationMetadataDetailsBlockHTML}
                ${administrativeControlsInlineHTML}
                ${userProductsListHTML}
                
                <div class="modal-expanded-actions-footer-row btn-group" style="margin-top:12px; padding-top:14px; border-top:1px solid #f0f0f0;">
                    <button class="btn-gray" onclick="closeActiveModalDirectly('product-detail-modal')">Close</button>
                    ${(APP_STATE.currentUser && APP_STATE.currentUser.uid !== targetUserObjMatchRecord.uid) ? `<button class="btn-blue" onclick="closeActiveModalDirectly('product-detail-modal'); initialDirectMessageCommunicationPipelineSetup('${targetUserObjMatchRecord.uid || targetUserObjMatchRecord.id}')">💬 Message Seller</button>` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById("product-detail-modal").classList.add("active");
}

/**
 * Prompts password confirmation modal for the admin before approving a target account.
 */
function promptAdminPasswordConfirmationForApproval(targetUserId) {
    const inputSubaccountField = document.getElementById("adm-user-subaccount-code");
    const newSubaccountCode = inputSubaccountField ? inputSubaccountField.value.trim() : "";

    if (!newSubaccountCode || newSubaccountCode === "ACCT_DEFAULT" || newSubaccountCode === "") {
        alert("Please enter a valid Paystack Subaccount Code before approving this account.");
        return;
    }

    let adminPwdModal = document.getElementById("admin-approval-pwd-modal");
    if (adminPwdModal) adminPwdModal.remove();

    adminPwdModal = document.createElement("div");
    adminPwdModal.id = "admin-approval-pwd-modal";
    adminPwdModal.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;";

    adminPwdModal.innerHTML = `
        <div style="background: white; border-radius: 8px; max-width: 400px; width: 90%; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
            <h3 style="margin-top:0; color:var(--fort-blue-dark);">Admin Security Verification</h3>
            <p style="font-size:0.88rem; color:#555; margin-bottom:16px;">Confirm admin password to approve user account and register Subaccount Code (<strong>${newSubaccountCode}</strong>):</p>
            
            <div style="margin-bottom:16px;">
                <label style="display:block; font-size:0.8rem; margin-bottom:4px; font-weight:600;">Admin Password</label>
                <input type="password" id="admin-confirm-pwd-input" class="form-field-control" placeholder="Enter admin password" style="width:100%; padding:8px; box-sizing:border-box; border:1px solid #ccc; border-radius:4px;">
                <div id="admin-confirm-pwd-error" style="color:red; font-size:0.8rem; margin-top:4px; display:none;"></div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
                <button class="btn-gray" onclick="document.getElementById('admin-approval-pwd-modal').remove()">Cancel</button>
                <button class="btn-blue" style="background-color:#28a745; border-color:#28a745;" onclick="finalizeAdminAccountApproval('${targetUserId}')">Confirm Approval</button>
            </div>
        </div>
    `;

    document.body.appendChild(adminPwdModal);
}

/**
 * Validates admin credentials and updates user status to 'verified'.
 */
function finalizeAdminAccountApproval(targetUserId) {
    const pwdInput = document.getElementById("admin-confirm-pwd-input");
    const errContainer = document.getElementById("admin-confirm-pwd-error");
    const enteredPassword = pwdInput ? pwdInput.value : "";

    const adminUser = APP_STATE.currentUser;
    const actualAdminPassword = adminUser ? (adminUser.secretKey || adminUser.password) : "";

    if (!enteredPassword || enteredPassword !== actualAdminPassword) {
        if (errContainer) {
            errContainer.innerText = "Invalid administrator password confirmation.";
            errContainer.style.display = "block";
        }
        return;
    }

    const accountInstance = SYSTEM_DATABASE.users.find(u => u.id === targetUserId || u.uid === targetUserId);
    if (!accountInstance) return;

    // Apply subaccount code & mark account as verified
    const inputSubaccountField = document.getElementById("adm-user-subaccount-code");
    if (inputSubaccountField) {
        accountInstance.subaccountCode = inputSubaccountField.value.trim();
    }

    accountInstance.verificationStatus = "verified";
    accountInstance.status = "verified";

    // Persist modifications
    if (typeof syncPlatformDatabaseStateToWebStorage === "function") {
        syncPlatformDatabaseStateToWebStorage();
    } else if (typeof commitDatabasesStateToLocalStorage === "function") {
        commitDatabasesStateToLocalStorage();
    }

    document.getElementById("admin-approval-pwd-modal").remove();
    closeActiveModalDirectly("product-detail-modal");

    if (typeof renderAdminUsersManagementList === "function") {
        renderAdminUsersManagementList();
    }

    if (typeof showAlertModal === "function") {
        showAlertModal("Account Approved", "The account has been marked as verified and subaccount code assigned.");
    } else if (typeof showTopRightToast === "function") {
        showTopRightToast("Account approved successfully.", "success");
    }
}

/**
 * Commits administrative code alterations into local database storage.
 */
function executeInlineAdminSave(userId) {
    const accountInstance = SYSTEM_DATABASE.users.find(u => u.id === userId || u.uid === userId);
    if (!accountInstance) return;

    // 1. Process status tracking strings
    const cachedStatusElement = document.getElementById("lbl-inspector-active-status-tag");
    const evaluatedStatusValue = cachedStatusElement && cachedStatusElement.getAttribute("data-pending-status-value") 
        ? cachedStatusElement.getAttribute("data-pending-status-value") 
        : (accountInstance.verificationStatus || accountInstance.status || 'unverified');

    accountInstance.verificationStatus = evaluatedStatusValue;
    accountInstance.status = evaluatedStatusValue;

    // 2. Process manual identifier Text updates
    const inputIdentifierField = document.getElementById("adm-user-identifier-text");
    if (inputIdentifierField) {
        accountInstance.identifierText = inputIdentifierField.value.trim();
    }

    // 3. Process subaccount code
    const inputSubaccountField = document.getElementById("adm-user-subaccount-code");
    if (inputSubaccountField) {
        accountInstance.subaccountCode = inputSubaccountField.value.trim();
    }

    // 4. Process password updates
    const inputPasswordField = document.getElementById("adm-user-security-password");
    if (inputPasswordField) {
        const val = inputPasswordField.value.trim();
        accountInstance.secretKey = val;
        accountInstance.password = val;
    }

    // 5. Process OTP code variables
    const inputCodeField = document.getElementById("UserAccountAuthenticationVerificationCode");
    if (inputCodeField) {
        const boundValue = inputCodeField.value.trim();
        accountInstance.UserAccountAuthenticationVerificationCode = boundValue;
        accountInstance.verificationCode = boundValue;
    }

    // 6. Process account type switches
    const accountTypeSelectField = document.getElementById("adm-change-account-type");
    if (accountTypeSelectField) {
        const selectedType = accountTypeSelectField.value;
        accountInstance.accountType = selectedType;
        accountInstance.type = selectedType;
    }

    if (typeof syncPlatformDatabaseStateToWebStorage === "function") {
        syncPlatformDatabaseStateToWebStorage();
    } else if (typeof commitDatabasesStateToLocalStorage === "function") {
        commitDatabasesStateToLocalStorage();
    }
    
    if (typeof renderAdminUsersManagementList === "function") {
        renderAdminUsersManagementList();
    }

    closeActiveModalDirectly("product-detail-modal");
    
    if (typeof showAlertModal === "function") {
        showAlertModal("Overwrites Saved", "Target credentials variables written to registry.");
    } else if (typeof showTopRightToast === "function") {
        showTopRightToast("Overwrites Saved successfully.", "success");
    }
}