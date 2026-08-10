/**
 * Universal Unified Infrastructure Floating Operations System Controller Launcher Method Engine
 */
function handleFloatingActionButtonTriggertwo() {
    if (!APP_STATE || !APP_STATE.currentUser) {
        if (typeof triggerAuthenticationModalSequence === 'function') {
            triggerAuthenticationModalSequence();
        } else {
            showTopRightToast("Please log in to continue.", "error");
        }
        return;
    }
    
    // Evaluate operational dynamic parameters rules routes contexts relative to view page positions
    if (APP_STATE.currentUser.accountType !== 'business' && APP_STATE.currentUser.uid !== 'admin') {
        if (typeof launchadvertismentofBusinessUpgrade === 'function') {
            launchadvertismentofBusinessUpgrade();
        } else {
            showTopRightToast("Upgrade to a business account to upload products.", "info");
        }
        return;
    }
    
    // Launch the security verification step first
    launchUploadProductPasswordVerificationSteptwo();
}

/**
 * Step 1: Verify account ownership via password authentication
 */
function launchUploadProductPasswordVerificationSteptwo() {
    const modalContentTargetNode = document.getElementById("auth-modal-content");
    if (!modalContentTargetNode) return;

    modalContentTargetNode.innerHTML = `
        <h3>Enter Current Password (Step 1 of 2)</h3>
    
        <div class="form-input-container margin-top-sm">
            <label>Active Password:</label>
            <input type="password" id="upload-verify-password" class="form-field-control" placeholder="Enter password to verify ownership context">
            
            <div id="err-upload-reauth-msg" class="text-danger-alert hidden-node">Incorrect Password</div>
        </div>

        <div style="margin-top: 6px; display: flex; align-items: center; gap: 6px;">
            <input type="checkbox" id="chk-upload-showpass" onchange="toggleFormPasswordFieldVisibility(this, 'upload-verify-password')">
            <label for="chk-upload-showpass" style="font-size: 0.8rem; font-weight: 400; cursor: pointer; user-select: none;">Show Password</label>            
        </div>

        <div class="text-center margin-top-xs">
            <span style="color:var(--fort-blue-light); cursor:pointer; font-size:0.9rem;" onclick="renderForgotPasswordModalWorkflow()">Forgot Password?</span>
        </div>
        <br>
        
        <div class="btn-group">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel</button> 
            <button onclick="verifyPasswordAndProceedtwo()" class="btn-blue">Verify Password Phrase</button>
        </div>
    `;
    
    const authModal = document.getElementById("auth-modal");
    if (authModal) authModal.classList.add("active");
}

/**
 * Validates Step 1 password against active system state variables and advances to Step 2
 */
function verifyPasswordAndProceedtwo() {
    const passwordInput = document.getElementById("upload-verify-password");
    const errNode = document.getElementById("err-upload-reauth-msg");
    
    if (!passwordInput) return;
    const enteredPassword = passwordInput.value.trim();
    
    if (errNode) errNode.classList.add("hidden-node");
    
    if (!APP_STATE || !APP_STATE.currentUser) {
        showTopRightToast("User session invalid.", "error");
        return;
    }

    // Dynamic password resolution for standard accounts and admins
    const activePassword = APP_STATE.currentUser.secretKey || APP_STATE.currentUser.password;

    if (!activePassword || enteredPassword !== activePassword) { 
        if (errNode) {
            errNode.innerText = "Incorrect Password"; 
            errNode.classList.remove("hidden-node"); 
        } else {
            showTopRightToast("Incorrect Password", "error");
        }
        return;
    }
    
    // Step 1 Success -> Proceed to Step 2 Form Inventory Template Layout
    launchUploadProductInventoryModalFormLayoutShelltwo();
}

/**
 * Step 2: Input product details and specifications
 */
function launchUploadProductInventoryModalFormLayoutShelltwo() {
    const modalContentTargetNode = document.getElementById("auth-modal-content");
    if (!modalContentTargetNode) return;

    const userCountry = (APP_STATE && APP_STATE.currentUser && APP_STATE.currentUser.country) ? APP_STATE.currentUser.country : 'Global';
    const currencySymbol = userCountry === 'Nigeria' ? '₦' : '$';

    modalContentTargetNode.innerHTML = `
        <h3>Product Upload - Step 2 of 2</h3>
        <p style="font-size:0.8rem; color:var(--fort-gray-slate); margin-top:2px;">Products created are localized and viewable exclusively within corresponding matching legal registration domain regions [Country Scope: <strong>${userCountry}</strong>]</p>
        
        <div class="form-input-container margin-top-sm">
            <label>Product Name</label>
            <input type="text" id="newprod-name" class="form-field-control" placeholder="Enter concise commercial inventory title text">
        </div>
 
        <div class="form-input-container">
            <label>Select Logistics Catalog Classification Category:</label>
            <select id="newprod-cat" class="form-field-control">
                <option value="Electrical Appliances">Electrical Appliances</option>
                <option value="Mobile Devices & Computers">Mobile Devices & Computers</option>
                <option value="Home Furniture">Home Furniture</option>
                <option value="Fashion Clothing Apparel">Fashion Clothing Apparel</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Sports, Fitness and Outdoors">Sports, Fitness and Outdoors</option>
                <option value="Groceries & Essentials">Groceries & Essentials</option>
                <option value="Others">Others</option>
            </select>
        </div>
        <div class="form-input-container">
            <label>Primary Short Public Marketing Overview Description (Max 100 Chars):</label>
            <input type="text" id="newprod-info" class="form-field-control" maxlength="100" placeholder="Max 100 text characters symbols structural limits constraints loops">
        </div>
        <div class="form-input-container-image">
            <label>Upload and Preview your Image</label>
            <div class="preview-box" style="min-height: 100px; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc; margin-bottom: 10px;">
                <span id="placeholderTextimg">No image selected</span>
                <img id="imagePreview" alt="Image Preview" style="max-width: 100%; max-height: 200px; display: none;">
            </div>
            <input type="file" id="imageInput" accept="image/*">
        </div>
        <br>
        <div class="form-input-container">
            <label>More Info and Specifications</label>
            <textarea id="newprod-aiinfo" class="form-field-control rounded-rect" style="height:60px;" placeholder="A more detailed explanation of product. (Optional but recommended)"></textarea>
        </div>
        <div class="form-input-container">
            <label>Unit Commercial Pricing Valuation Baseline Quote Amount Number (${currencySymbol}):</label>
            <input type="number" id="newprod-price" class="form-field-control" placeholder="Enter numeric base rate configuration">
        </div>
        
        <div class="btn-group margin-top-md">
            <button onclick="closeActiveModalDirectly('auth-modal')" class="btn-gray">Cancel Form</button>
            <button id="btn-publish-post" onclick="executePipelineCommitNewInventoryPostRecordtwo()" class="btn-blue">Publish Active Post</button>
        </div>
    `;

    setupImagePreviewListener();
    const authModal = document.getElementById("auth-modal");
    if (authModal) authModal.classList.add("active");
}

/**
 * Handles live preview display
 */
function setupImagePreviewListenertwo() {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const placeholderText = document.getElementById("placeholderTextimg");

    if (!imageInput) return;

    imageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (imagePreview) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                }
                if (placeholderText) {
                    placeholderText.style.display = "none";
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (imagePreview) {
                imagePreview.src = "";
                imagePreview.style.display = "none";
            }
            if (placeholderText) {
                placeholderText.style.display = "block";
            }
        }
    });
}

/**
 * Final Submission: Collects variables, processes files, updates databases
 */
async function executePipelineCommitNewInventoryPostRecordtwo() {
    const publishBtn = document.getElementById("btn-publish-post");
    const nameInput = document.getElementById("newprod-name");
    const catInput = document.getElementById("newprod-cat");
    const infoInput = document.getElementById("newprod-info");
    const imageInput = document.getElementById("imageInput");
    const aiInfoInput = document.getElementById("newprod-aiinfo");
    const priceInput = document.getElementById("newprod-price");

    const name = nameInput ? nameInput.value.trim() : "";
    const cat = catInput ? catInput.value : "Others";
    const info = infoInput ? infoInput.value.trim() : "";
    const aiInfo = aiInfoInput ? aiInfoInput.value.trim() : "";
    const priceRaw = priceInput ? priceInput.value : "";

    // Validate core compulsory fields
    if (!name || !info || !priceRaw || !imageInput || !imageInput.files || !imageInput.files[0]) {
        if (typeof showTopRightToast === 'function') {
            showTopRightToast("All compulsory info must be imputed and select an image before publishing.", "error");
        } else {
            alert("All compulsory info must be imputed and select an image before publishing.");
        }
        return;
    }

    try {
        if (publishBtn) {
            publishBtn.disabled = true;
            publishBtn.innerText = "Publishing...";
        }

        // Compress and extract Base64 data URL reliably
        const productImgDataUrl = await compressImageFile(imageInput.files[0]);

        // Isolate owner profile data points safely
        const ownerUid = APP_STATE.currentUser ? APP_STATE.currentUser.uid : ("user_" + Date.now());
        const ownerName = APP_STATE.currentUser ? (APP_STATE.currentUser.identityName || APP_STATE.currentUser.username || "User Account") : "User Account";
        const ownerBusinessName = APP_STATE.currentUser ? (APP_STATE.currentUser.businessName || ownerName) : ownerName;

        const finalProductInstanceObjectNode = {
            pid: "p_" + Date.now(),
            ownerUid: ownerUid,
            ownerName: ownerName,
            ownerBusinessName: ownerBusinessName,
            name: name,
            category: cat,
            info: info,
            price: parseFloat(priceRaw),
            coverPhoto: productImgDataUrl,
            aiInfo: aiInfo || "Standard platform baseline listed trading stock profile object reference specifications tracking structure model elements values data parameters.",
            clickCount: 0,
            createdAt: new Date().toISOString()
        };

        // Save to local state memory
        if (typeof SYSTEM_DATABASE === 'undefined') window.SYSTEM_DATABASE = {};
        if (!SYSTEM_DATABASE.products) SYSTEM_DATABASE.products = [];
        SYSTEM_DATABASE.products.push(finalProductInstanceObjectNode);

        // Safe web storage persistence (isolated so quota errors won't throw user-facing exceptions)
        try {
            if (typeof syncPlatformDatabaseStateToWebStorage === 'function') {
                syncPlatformDatabaseStateToWebStorage();
            }
        } catch (storageErr) {
            console.warn("Storage quota reached. Product saved in memory for active session:", storageErr);
        }
        
        if (typeof closeActiveModalDirectly === 'function') {
            closeActiveModalDirectly('auth-modal');
        }
        
        if (typeof showTopRightToast === 'function') {
            showTopRightToast("Product posted successfully!", "success");
        }
        
        if (typeof renderMarketplaceProductsDisplayLoop === 'function') {
            renderMarketplaceProductsDisplayLoop();
        }

    } catch (err) {
        console.error("Product publishing pipeline error:", err);
        if (typeof showTopRightToast === 'function') {
            showTopRightToast("An error occurred while uploading your product. Please try again.", "error");
        }
    } finally {
        if (publishBtn) {
            publishBtn.disabled = false;
            publishBtn.innerText = "Publish Active Post";
        }
    }
}
