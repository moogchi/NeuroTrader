# Use Intel oneAPI Basekit as a parent image
FROM intel/oneapi-basekit:2025.1.3-0-devel-ubuntu24.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    lsb-release \
    gnupg2 \
    sudo \
    curl \
    vim \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Update package lists
RUN apt-get update

# Install Python, pip, and venv
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create and activate virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install PyTorch XPU in the virtual environment
RUN pip3 install --no-cache-dir torch==2.8.0 --index-url https://download.pytorch.org/whl/test/xpu

# Verify PyTorch installation and XPU availability
RUN python3 -c "import torch; print('PyTorch version:', torch.__version__); print('XPU available:', torch.xpu.is_available())"


# Set the working directory
WORKDIR /workspace

# Default command
CMD ["/bin/bash"]